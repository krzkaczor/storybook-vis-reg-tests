import { BigNumber } from "bignumber.js";
import { addHexPrefix } from "ethereumjs-util";
import { delay, END, eventChannel } from "redux-saga";
import { fork, put, select } from "redux-saga/effects";
import * as Web3 from "web3";

import { TGlobalDependencies } from "../../../di/setupBindings";
import { TPendingTxs, TxPendingWithMetadata } from "../../../lib/api/users/interfaces";
import { ITxData } from "../../../lib/web3/types";
import { OutOfGasError, RevertedTransactionError } from "../../../lib/web3/Web3Adapter";
import { invariant } from "../../../utils/invariant";
import { actions } from "../../actions";
import { neuCall, neuTakeLatest, neuTakeUntil } from "../../sagasUtils";
import { ETransactionErrorType, ETxSenderState } from "../sender/reducer";
import { txMonitorSaga } from "../sender/sagas";
import { InvestmentAdditionalDataSchema } from "../transactions/investment/types";
import { ETxSenderType, TSpecificTransactionState } from "../types";
import { SchemaMismatchError } from "./errors";
import { selectPlatformPendingTransaction } from "./selectors";
import { EEventEmitterChannelEvents, TEventEmitterChannelEvents } from "./types";

const TX_MONITOR_DELAY = 30000;

export function* deletePendingTransaction({
  apiUserService,
  logger,
}: TGlobalDependencies): Iterable<any> {
  const pendingTransaction: TxPendingWithMetadata | undefined = yield select(
    selectPlatformPendingTransaction,
  );

  if (!pendingTransaction) {
    throw new Error("There should be pending transaction in the pool");
  }

  const txHash = pendingTransaction.transaction.hash;

  logger.info(`Removing pending transaction from list with hash ${txHash}`);

  yield apiUserService.deletePendingTx(txHash);
  yield put(actions.txMonitor.setPendingTxs({ pendingTransaction: undefined }));
}

export function* markTransactionAsPending(
  { apiUserService }: TGlobalDependencies,
  {
    txHash,
    type,
    txData,
    txAdditionalData,
  }: {
    txHash: string;
    type: ETxSenderType;
    txData: ITxData;
    txAdditionalData?: TSpecificTransactionState["additionalData"];
  },
): any {
  const currentPending: TxPendingWithMetadata | undefined = yield select(
    selectPlatformPendingTransaction,
  );

  if (currentPending) {
    invariant(
      currentPending.transactionStatus !== ETxSenderState.MINING,
      "There is already another custom pending transaction",
    );

    yield apiUserService.deletePendingTx(currentPending.transaction.hash);
  }

  const transactionTimestamp = Date.now();

  const pendingTransaction: TxPendingWithMetadata = {
    transaction: {
      from: addHexPrefix(txData.from),
      gas: addHexPrefix(new BigNumber(txData.gas).toString(16)),
      gasPrice: addHexPrefix(new BigNumber(txData.gasPrice).toString(16)),
      hash: addHexPrefix(txHash),
      input: addHexPrefix(txData.data || "0x0"),
      nonce: addHexPrefix("0"),
      to: addHexPrefix(txData.to),
      value: addHexPrefix(new BigNumber(txData.value).toString(16)),
      blockHash: undefined,
      blockNumber: undefined,
      chainId: undefined,
      status: undefined,
      transactionIndex: undefined,
    },
    transactionType: type,
    transactionAdditionalData: txAdditionalData,
    transactionStatus: ETxSenderState.MINING,
    transactionError: undefined,
    transactionTimestamp,
  };

  yield apiUserService.addPendingTx(pendingTransaction);

  yield put(actions.txMonitor.setPendingTxs({ pendingTransaction }));

  return transactionTimestamp;
}

export function* ensumrePendingTransactionSchemaIsValid(
  pendingTransaction: TxPendingWithMetadata,
): Iterator<any> {
  // THIS IS A TEMPORARY PATCH A GENERAL SOLUTION THAT INCLUDES VERSIONING SHOULD COVER ALL TX TYPES
  switch (pendingTransaction.transactionType) {
    case ETxSenderType.WITHDRAW:
      if (
        pendingTransaction.transactionAdditionalData === undefined ||
        (pendingTransaction.transactionAdditionalData &&
          (pendingTransaction.transactionAdditionalData.to === undefined ||
            pendingTransaction.transactionAdditionalData.amount === undefined ||
            pendingTransaction.transactionAdditionalData.amountEur === undefined ||
            pendingTransaction.transactionAdditionalData.totalEur === undefined ||
            pendingTransaction.transactionAdditionalData.total === undefined))
      ) {
        throw new SchemaMismatchError(ETxSenderType.WITHDRAW);
      }
      break;

    case ETxSenderType.INVEST: {
      const isValid = yield InvestmentAdditionalDataSchema.toYup().isValid(
        pendingTransaction.transactionAdditionalData,
      );

      if (!isValid) {
        throw new SchemaMismatchError(ETxSenderType.INVEST);
      }
      break;
    }

    default:
      return;
  }
}

export function* updatePendingTxs({
  apiUserService,
  web3Manager,
  logger,
}: TGlobalDependencies): any {
  let apiPendingTx: TPendingTxs = yield apiUserService.pendingTxs();

  // check whether transaction was mined
  if (apiPendingTx.pendingTransaction) {
    const pendingTransaction = apiPendingTx.pendingTransaction;
    const txHash = pendingTransaction.transaction.hash;

    if (pendingTransaction.transactionStatus === undefined) {
      logger.warn(
        new Error(`Transaction status is not defined for pending transaction with hash ${txHash}.`),
      );
    }

    try {
      const transaction: Web3.Transaction | null = yield web3Manager.internalWeb3Adapter.getTransactionOrThrow(
        txHash,
      );

      if (transaction) {
        apiPendingTx = {
          ...apiPendingTx,
          pendingTransaction: {
            ...pendingTransaction,
            transactionStatus: ETxSenderState.DONE,
          },
        };
      }
    } catch (error) {
      if (error instanceof RevertedTransactionError) {
        apiPendingTx = {
          ...apiPendingTx,
          pendingTransaction: {
            ...pendingTransaction,
            transactionStatus: ETxSenderState.ERROR_SIGN,
            transactionError: ETransactionErrorType.REVERTED_TX,
          },
        };
      }

      if (error instanceof OutOfGasError) {
        apiPendingTx = {
          ...apiPendingTx,
          pendingTransaction: {
            ...pendingTransaction,
            transactionStatus: ETxSenderState.ERROR_SIGN,
            transactionError: ETransactionErrorType.OUT_OF_GAS,
          },
        };
      }
    }
  }

  try {
    // If there is a pending transaction, check if schema is valid
    if (apiPendingTx.pendingTransaction) {
      yield ensumrePendingTransactionSchemaIsValid(apiPendingTx.pendingTransaction);
    }

    yield put(actions.txMonitor.setPendingTxs(apiPendingTx));
  } catch (e) {
    if (e instanceof SchemaMismatchError) {
      logger.warn("Found pending transaction Schema Mismatch", e);

      if (apiPendingTx.pendingTransaction) {
        yield apiUserService.deletePendingTx(apiPendingTx.pendingTransaction.transaction.hash);
      }
    } else {
      throw e;
    }
  }
}

function* txMonitor({ logger }: TGlobalDependencies): any {
  while (true) {
    logger.info("Querying for pending txs...");
    try {
      yield neuCall(updatePendingTxs);
    } catch (e) {
      logger.error("Error getting pending txs", e);
    }

    yield delay(TX_MONITOR_DELAY);
  }
}

export const createWatchTxChannel = ({ web3Manager }: TGlobalDependencies, txHash: string) =>
  eventChannel<TEventEmitterChannelEvents>(emitter => {
    web3Manager.internalWeb3Adapter
      .waitForTx({
        txHash,
        onNewBlock: async blockId => {
          emitter({ type: EEventEmitterChannelEvents.NEW_BLOCK, blockId });
        },
      })
      .then(tx => emitter({ type: EEventEmitterChannelEvents.TX_MINED, tx }))
      .catch(error => {
        if (error instanceof RevertedTransactionError) {
          emitter({ type: EEventEmitterChannelEvents.REVERTED_TRANSACTION, error });
        } else if (error instanceof OutOfGasError) {
          emitter({ type: EEventEmitterChannelEvents.OUT_OF_GAS, error });
        } else {
          emitter({ type: EEventEmitterChannelEvents.ERROR, error });
        }
      })
      .then(() => emitter(END));
    return () => {
      // @todo missing unsubscribe
    };
  });

function* removePendingTransaction({ logger }: TGlobalDependencies): Iterator<any> {
  try {
    // call delete transaction saga
    yield neuCall(deletePendingTransaction);

    logger.info("Pending transaction has been deleted");
  } catch (e) {
    logger.error(new Error("Unable to delete pending transaction"));
  } finally {
    yield put(actions.txSender.txSenderHideModal());
  }
}

export function* txMonitorSagas(): any {
  yield fork(neuTakeUntil, actions.auth.setUser, actions.auth.logout, txMonitor);
  yield fork(neuTakeLatest, actions.txMonitor.monitorPendingPlatformTx, txMonitorSaga);
  yield fork(neuTakeLatest, actions.txMonitor.deletePendingTransaction, removePendingTransaction);
}
