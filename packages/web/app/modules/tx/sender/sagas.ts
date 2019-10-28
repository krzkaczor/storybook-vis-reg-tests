import { call, Effect, put, race, select, take, takeLatest } from "redux-saga/effects";

import { TGlobalDependencies } from "../../../di/setupBindings";
import {
  TPendingTxs,
  TxPendingWithMetadata,
  TxWithMetadata,
} from "../../../lib/api/users/interfaces";
import { BrowserWalletError } from "../../../lib/web3/browser-wallet/BrowserWallet";
import { LedgerError } from "../../../lib/web3/ledger-wallet/errors";
import { LightError } from "../../../lib/web3/light-wallet/LightWallet";
import {
  InvalidChangeIdError,
  InvalidRlpDataError,
  LongTransactionQueError,
  LowNonceError,
  OutOfGasError,
  UnknownEthNodeError,
} from "../../../lib/web3/Web3Adapter";
import { SignerError } from "../../../lib/web3/Web3Manager/Web3Manager";
import { IAppState } from "../../../store";
import { connectWallet } from "../../access-wallet/sagas";
import { actions } from "../../actions";
import { IGasState } from "../../gas/reducer";
import { selectGasPrice } from "../../gas/selectors";
import { neuCall, neuRepeatIf, neuSpawn } from "../../sagasUtils";
import {
  createWatchTxChannel,
  deletePendingTransaction,
  markTransactionAsPending,
  updatePendingTxs,
} from "../monitor/sagas";
import {
  selectAreTherePendingTxs,
  selectAreTherePlatformPendingTxs,
  selectExternalPendingTransaction,
} from "../monitor/selectors";
import { EEventEmitterChannelEvents, TEventEmitterChannelEvents } from "../monitor/types";
import { ETxSenderType, TAdditionalDataByType } from "../types";
import { validateGas } from "../validator/sagas";
import { ETransactionErrorType, ETxSenderState } from "./reducer";
import { selectTxAdditionalData, selectTxDetails, selectTxType } from "./selectors";
import { getTxSenderErrorType } from "./utils";

export interface ITxSendParams {
  type: ETxSenderType;
  transactionFlowGenerator: any;
  extraParam?: any;
  // Design extraParam to be a tuple that handles any number of params
  // @see neuCall
}

export function* txMonitorSaga(): any {
  const txMonitorEffect = neuCall(txMonitor);

  yield call(txControllerSaga, txMonitorEffect);
}

function* txMonitor(_: TGlobalDependencies): Iterable<any> {
  const txs: TPendingTxs = yield select((s: IAppState) => s.txMonitor.txs);

  if (txs.pendingTransaction) {
    const pendingTransaction = txs.pendingTransaction as TxPendingWithMetadata;

    const txHash = pendingTransaction.transaction.hash;

    yield put(
      actions.txSender.txSenderShowModal({
        additionalData: pendingTransaction.transactionAdditionalData,
        error: pendingTransaction.transactionError,
        state: pendingTransaction.transactionStatus,
        txDetails: pendingTransaction.transaction,
        txHash: txHash,
        txTimestamp: pendingTransaction.transactionTimestamp,
        type: pendingTransaction.transactionType,
      }),
    );

    // only watch for transaction status when not yet mined
    if (pendingTransaction.transactionStatus === ETxSenderState.MINING) {
      yield neuCall(watchTxSubSaga, txHash);
    }
  }
}

function* txControllerSaga(controlledEffect: Iterator<Effect>): any {
  const gasPrice: IGasState = yield select(selectGasPrice);

  if (!gasPrice) {
    yield take(actions.gas.gasApiLoaded);
  }

  const { cancel } = yield race({
    result: controlledEffect,
    cancel: take("TX_SENDER_HIDE_MODAL"),
  });

  if (cancel) {
    throw new Error("TX_SENDING_CANCELLED");
  }

  // wait for user to close modal
  yield take("TX_SENDER_HIDE_MODAL");

  // when modal was closed delete transaction for pending list
  yield neuCall(deletePendingTransaction);

  yield put(actions.wallet.loadWalletData());
}

export function* txSendSaga({ type, transactionFlowGenerator, extraParam }: ITxSendParams): any {
  yield neuCall(ensureNoPendingTx);

  const sendProcessEffect = neuCall(txSendProcess, type, transactionFlowGenerator, extraParam);

  yield call(txControllerSaga, sendProcessEffect);
}

function* txSendProcess(
  { logger }: TGlobalDependencies,
  transactionType: ETxSenderType,
  transactionFlowGenerator: any,
  extraParam?: any,
): any {
  try {
    yield put(actions.txSender.txSenderShowModal({ type: transactionType }));

    yield neuRepeatIf("TX_SENDER_CHANGE", "TX_SENDER_ACCEPT", transactionFlowGenerator, extraParam);

    const txData = yield select(selectTxDetails);
    // Check if gas amount is correct
    yield validateGas(txData);

    // accept transaction on wallet
    yield call(connectWallet);

    yield put(actions.txSender.txSenderWalletPlugged());

    // send transaction
    const txHash = yield neuCall(sendTxSubSaga);

    yield neuCall(watchTxSubSaga, txHash);
  } catch (error) {
    const errorType = getTxSenderErrorType(error);

    logger.error(`Error while processing transaction`, error, { errorType, transactionType });

    yield put(actions.txSender.txSenderError(errorType));
  }
}

/**
 * Check for pending transactions, behaves differently depending on the tx type
 * 1. For pending platform tx it will stop current tx (by throwing error) and start monitoring pending transaction
 * 2. For external pending tx wait for it to finish and then continue with current tx
 */
function* ensureNoPendingTx({ logger }: TGlobalDependencies): any {
  while (true) {
    yield neuCall(updatePendingTxs);

    const areTherePendingTxs: boolean = yield select(selectAreTherePendingTxs);
    if (!areTherePendingTxs) {
      return;
    }

    const areTherePlatformPendingTransactions: boolean = yield select(
      selectAreTherePlatformPendingTxs,
    );
    if (areTherePlatformPendingTransactions) {
      // create new detached process
      yield neuSpawn(txMonitorSaga);

      // cancel current one
      throw new Error("There is already a pending transaction on the platform");
    }

    const externalPendingTransaction: TxWithMetadata | undefined = yield select(
      selectExternalPendingTransaction,
    );
    if (externalPendingTransaction) {
      // go to miner
      const txHash = externalPendingTransaction.transaction.hash;
      yield put(actions.txSender.txSenderWatchPendingTxs(txHash));
      logger.info(`Waiting for out of bound transactions: ${txHash}`);
      yield neuCall(watchPendingOOOTxSubSaga, txHash);
    }
  }
}

function* sendTxSubSaga({ web3Manager }: TGlobalDependencies): any {
  const type: ReturnType<typeof selectTxType> = yield select(selectTxType);
  const txData: ReturnType<typeof selectTxDetails> = yield select(selectTxDetails);

  if (!txData || !type) {
    throw new Error("Tx data is not defined");
  }

  const txAdditionalData: TAdditionalDataByType<typeof type> = yield select((state: IAppState) =>
    selectTxAdditionalData<typeof type>(state),
  );

  try {
    const txHash: string = yield web3Manager.sendTransaction(txData);

    const txTimestamp = yield neuCall(markTransactionAsPending, {
      txHash,
      type,
      txData,
      txAdditionalData,
    });

    yield put(actions.txSender.txSenderSigned(txHash, type, txTimestamp));

    return txHash;
  } catch (error) {
    // Set timestamp for failed transaction
    yield put(actions.txSender.setTimestamp(Date.now()));

    if (
      error instanceof LedgerError ||
      error instanceof LightError ||
      error instanceof BrowserWalletError ||
      error instanceof SignerError
    ) {
      throw error;
    }

    // @see https://github.com/paritytech/parity-ethereum/blob/61f4534e2a5f9c947661af0eaf4af5b76456efe0/rpc/src/v1/helpers/errors.rs#L304
    if (
      error.code === -32010 &&
      error.message.startsWith("Insufficient funds. The account you tried to send transaction")
    ) {
      return yield put(actions.txSender.txSenderError(ETransactionErrorType.NOT_ENOUGH_FUNDS));
    }

    if (
      (error.code === -32000 && error.message === "intrinsic gas too low") ||
      (error.code === -32010 &&
        error.message.startsWith("Transaction gas is too low. There is not enough")) ||
      (error.code === -32010 && error.message.startsWith("exceeds current gas limit"))
    ) {
      throw new OutOfGasError();
    }

    if (error.code === -32010 && error.message.startsWith("Transaction nonce is too low")) {
      throw new LowNonceError();
    }

    if (
      error.code === -32010 &&
      error.message.startsWith("There are too many transactions in the queue")
    ) {
      throw new LongTransactionQueError();
    }

    if (error.code === -32010 && error.message.startsWith("Invalid RLP data")) {
      throw new InvalidRlpDataError();
    }

    if (error.code === -32010 && error.message.startsWith("Invalid chain id")) {
      throw new InvalidChangeIdError();
    }

    throw new UnknownEthNodeError(error);
  }
}

function* watchPendingOOOTxSubSaga({ logger }: TGlobalDependencies, txHash: string): any {
  logger.info(`Watching for out of bound transaction: ${txHash}`);

  const watchTxChannel = yield neuCall(createWatchTxChannel, txHash);
  try {
    while (true) {
      const result: TEventEmitterChannelEvents = yield take(watchTxChannel);
      if (result.type === EEventEmitterChannelEvents.NEW_BLOCK) {
        yield put(actions.txSender.txSenderReportBlock(result.blockId));
      } else {
        if (result.type === EEventEmitterChannelEvents.ERROR) {
          logger.warn(`Error while watching pending Tx ${txHash}`, result.error);
        }
        return;
      }
    }
  } finally {
    watchTxChannel.close();
    logger.info("Stopped Watching for TX", { txHash });
  }
}

function* watchTxSubSaga({ logger }: TGlobalDependencies, txHash: string): any {
  logger.info(`Watching for transaction: ${txHash}`);

  const watchTxChannel = yield neuCall(createWatchTxChannel, txHash);
  try {
    while (true) {
      const result: TEventEmitterChannelEvents = yield take(watchTxChannel);
      switch (result.type) {
        case EEventEmitterChannelEvents.NEW_BLOCK:
          yield put(actions.txSender.txSenderReportBlock(result.blockId));
          break;
        case EEventEmitterChannelEvents.TX_MINED:
          yield neuCall(updatePendingTxs);
          return yield put(actions.txSender.txSenderTxMined());
        // Non terminal errors - Tx Mining should continue
        case EEventEmitterChannelEvents.ERROR:
          logger.error("Error while tx watching: ", result.error, { txHash });
          break;
        // Terminal errors - Tx Mining should exit
        case EEventEmitterChannelEvents.OUT_OF_GAS:
          logger.warn("Error Transaction out of gas: ", result.error, { txHash });
          return yield put(actions.txSender.txSenderError(ETransactionErrorType.OUT_OF_GAS));
        case EEventEmitterChannelEvents.REVERTED_TRANSACTION:
          logger.warn("Error Transaction Reverted: ", result.error, { txHash });
          return yield put(actions.txSender.txSenderError(ETransactionErrorType.REVERTED_TX));
      }
    }
  } finally {
    watchTxChannel.close();
    logger.info("Stopped Watching for TXs", { txHash });
  }
}

function* cleanUpTxSender(): Iterator<any> {
  // Conduct any general cleanup operations
  yield put(actions.txValidator.clearValidationState());
  yield put(actions.txUserFlowWithdraw.clearDraftTx());
}

function* updateWalletValues(): Iterator<any> {
  // Refresh Wallet values
  yield put(actions.wallet.loadWalletData());
}

export const txSenderSagasWatcher = function*(): Iterator<any> {
  yield takeLatest("TX_SENDER_HIDE_MODAL", cleanUpTxSender);
  yield takeLatest(["TX_SENDER_TX_MINED", "TX_SENDER_ERROR"], updateWalletValues);
};
