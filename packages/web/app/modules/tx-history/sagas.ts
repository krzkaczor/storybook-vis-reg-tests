import { delay } from "redux-saga";
import { all, fork, put, select } from "redux-saga/effects";

import { ECurrency } from "../../components/shared/formatters/utils";
import { ETxHistoryMessage } from "../../components/translatedMessages/messages";
import { createMessage } from "../../components/translatedMessages/utils";
import { TransactionDetailsModal } from "../../components/wallet/transactions-history/TransactionDetailsModal";
import { TGlobalDependencies } from "../../di/setupBindings";
import {
  ETransactionType,
  TAnalyticsTransaction,
  TAnalyticsTransactionsResponse,
} from "../../lib/api/analytics-api/interfaces";
import { IAppState } from "../../store";
import { subtractBigNumbers } from "../../utils/BigNumberUtils";
import { EthereumAddressWithChecksum } from "../../utils/opaque-types/types";
import { actions, TActionFromCreator } from "../actions";
import { neuCall, neuTakeLatest, neuTakeUntil } from "../sagasUtils";
import { selectEurEquivalent } from "../shared/tokenPrice/selectors";
import { selectEthereumAddressWithChecksum } from "../web3/selectors";
import { TX_LIMIT, TX_POLLING_INTERVAL } from "./constants";
import { selectLastTransactionId, selectTimestampOfLastChange, selectTXById } from "./selectors";
import { ETransactionStatus, ETransactionSubType, TTxHistory, TTxHistoryCommon } from "./types";
import { getCurrencyFromTokenSymbol, getDecimalsFormat, getTxUniqueId } from "./utils";

function getTransactionCommon(transaction: TAnalyticsTransaction): TTxHistoryCommon {
  return {
    amount: transaction.extraData.amount.toString(),
    amountFormat: getDecimalsFormat(transaction.extraData.tokenMetadata),
    blockNumber: transaction.blockNumber,
    date: transaction.blockTime,
    id: getTxUniqueId(transaction),
    logIndex: transaction.logIndex,
    transactionDirection: transaction.transactionDirection,
    transactionIndex: transaction.transactionIndex,
    txHash: transaction.txHash,
  };
}

export function* mapAnalyticsApiTransactionResponse(
  { logger }: TGlobalDependencies,
  transaction: TAnalyticsTransaction,
): IterableIterator<any> {
  // we can return tx in each case but then we will loose type safety
  let tx: TTxHistory | undefined = undefined;

  switch (transaction.type) {
    case ETransactionType.ETO_INVESTMENT: {
      if (!transaction.extraData.assetTokenMetadata || !transaction.extraData.tokenMetadata) {
        throw new Error("Invalid asset token metadata");
      }

      const neuReward = transaction.extraData.neumarkReward!.toString();
      const neuRewardEur: string = yield select((state: IAppState) =>
        selectEurEquivalent(state, neuReward, ECurrency.NEU),
      );

      const address: EthereumAddressWithChecksum = yield select(selectEthereumAddressWithChecksum);

      // if funds from ICBM were used then wallet_address != address
      const isICBMInvestment = transaction.extraData.walletAddress !== address;

      // investment is completed when it was either claimed or refunded
      const isCompleted = !!transaction.extraData.isClaimed || !!transaction.extraData.isRefunded;

      tx = {
        ...getTransactionCommon(transaction),
        neuReward,
        neuRewardEur,
        isICBMInvestment,
        amountEur: transaction.extraData.baseCurrencyEquivalent!.toString(),
        companyName: transaction.extraData.assetTokenMetadata.companyName!,
        currency: getCurrencyFromTokenSymbol(transaction.extraData.tokenMetadata),
        equityTokenAmount: transaction.extraData.grantedAmount!.toString(),
        equityTokenAmountFormat: getDecimalsFormat(transaction.extraData.assetTokenMetadata),
        equityTokenCurrency: transaction.extraData.assetTokenMetadata.tokenSymbol,
        equityTokenIcon: transaction.extraData.assetTokenMetadata.tokenImage!,
        etoId: transaction.extraData.assetTokenMetadata.tokenCommitmentAddress!,
        toAddress: transaction.extraData.toAddress!,
        fromAddress: transaction.extraData.tokenAddress!,
        subType: isCompleted ? ETransactionStatus.COMPLETED : ETransactionStatus.PENDING,
        type: transaction.type,
      };
      break;
    }
    case ETransactionType.ETO_REFUND: {
      if (!transaction.extraData.assetTokenMetadata || !transaction.extraData.tokenMetadata) {
        throw new Error("Invalid asset token metadata");
      }

      const common = getTransactionCommon(transaction);

      const currency = getCurrencyFromTokenSymbol(transaction.extraData.tokenMetadata);

      const amountEur: string = yield select((state: IAppState) =>
        selectEurEquivalent(state, common.amount, currency),
      );

      const toAddress: EthereumAddressWithChecksum = yield select(
        selectEthereumAddressWithChecksum,
      );

      tx = {
        ...common,
        currency,
        amountEur,
        toAddress,
        subType: undefined,
        etoId: transaction.extraData.assetTokenMetadata.tokenCommitmentAddress!,
        type: transaction.type,
        companyName: transaction.extraData.assetTokenMetadata.companyName!,
      };
      break;
    }
    case ETransactionType.TRANSFER: {
      // In case it's an equity token transaction
      if (transaction.extraData.tokenInterface === "equityTokenInterface") {
        tx = {
          ...getTransactionCommon(transaction),
          type: transaction.type,
          subType: ETransactionSubType.TRANSFER_EQUITY_TOKEN,
          currency: transaction.extraData.tokenMetadata!.tokenSymbol,
          etoId: transaction.extraData.tokenMetadata!.tokenCommitmentAddress!,
          icon: transaction.extraData.tokenMetadata!.tokenImage!,
          fromAddress: transaction.extraData.fromAddress!,
          toAddress: transaction.extraData.toAddress!,
        };
      } else {
        const common = getTransactionCommon(transaction);

        const currency = getCurrencyFromTokenSymbol(transaction.extraData.tokenMetadata);

        const amountEur: string = yield select((state: IAppState) =>
          selectEurEquivalent(state, common.amount, currency),
        );

        tx = {
          ...common,
          currency,
          amountEur,
          subType: undefined,
          type: transaction.type,
          toAddress: transaction.extraData.toAddress!,
          fromAddress: transaction.extraData.fromAddress!,
        };
      }
      break;
    }
    case ETransactionType.NEUR_PURCHASE: {
      tx = {
        ...getTransactionCommon(transaction),
        subType: undefined,
        type: transaction.type,
        currency: ECurrency.EUR_TOKEN,
        toAddress: transaction.extraData.toAddress!,
      };
      break;
    }
    case ETransactionType.NEUR_REDEEM: {
      if (transaction.extraData.settledAmount) {
        const common = getTransactionCommon(transaction);
        const settledAmount = transaction.extraData.settledAmount.toString();

        tx = {
          ...getTransactionCommon(transaction),
          settledAmount,
          subType: ETransactionStatus.COMPLETED,
          type: transaction.type,
          currency: ECurrency.EUR_TOKEN,
          reference: transaction.extraData.reference!,
          fromAddress: transaction.extraData.fromAddress!,
          feeAmount: subtractBigNumbers([common.amount, settledAmount]),
        };
      } else {
        tx = {
          ...getTransactionCommon(transaction),
          subType: ETransactionStatus.PENDING,
          type: transaction.type,
          currency: ECurrency.EUR_TOKEN,
          reference: transaction.extraData.reference!,
          fromAddress: transaction.extraData.fromAddress!,
        };
      }

      break;
    }
    case ETransactionType.NEUR_DESTROY: {
      tx = {
        ...getTransactionCommon(transaction),
        subType: undefined,
        type: transaction.type,
        currency: ECurrency.EUR_TOKEN,
        liquidatedByAddress: transaction.extraData.byAddress!,
      };
      break;
    }
    case ETransactionType.ETO_TOKENS_CLAIM:
      {
        if (!transaction.extraData.assetTokenMetadata) {
          throw new Error("Asset token metadata should be provided");
        }

        const neuReward = transaction.extraData.neumarkReward!.toString();

        const neuRewardEur: string = yield select((state: IAppState) =>
          selectEurEquivalent(state, neuReward, ECurrency.NEU),
        );

        tx = {
          ...getTransactionCommon(transaction),
          neuReward,
          neuRewardEur,
          subType: undefined,
          type: transaction.type,
          amountFormat: getDecimalsFormat(transaction.extraData.assetTokenMetadata),
          currency: transaction.extraData.assetTokenMetadata.tokenSymbol,
          etoId: transaction.extraData.assetTokenMetadata.tokenCommitmentAddress!,
          icon: transaction.extraData.assetTokenMetadata.tokenImage!,
        };
      }
      break;

    case ETransactionType.PAYOUT: {
      if (!transaction.extraData.tokenMetadata) {
        throw new Error("Invalid token metadata");
      }

      const common = getTransactionCommon(transaction);

      const currency = getCurrencyFromTokenSymbol(transaction.extraData.tokenMetadata);

      const amountEur: string = yield select((state: IAppState) =>
        selectEurEquivalent(state, common.amount, currency),
      );

      const toAddress: EthereumAddressWithChecksum = yield select(
        selectEthereumAddressWithChecksum,
      );

      tx = {
        ...common,
        currency,
        amountEur,
        toAddress,
        subType: undefined,
        type: transaction.type,
      };
      break;
    }
    case ETransactionType.REDISTRIBUTE_PAYOUT: {
      if (!transaction.extraData.tokenMetadata) {
        throw new Error("Invalid token metadata");
      }
      const common = getTransactionCommon(transaction);

      const currency = getCurrencyFromTokenSymbol(transaction.extraData.tokenMetadata);

      const amountEur: string = yield select((state: IAppState) =>
        selectEurEquivalent(state, common.amount, currency),
      );

      tx = {
        ...common,
        currency,
        amountEur,
        subType: undefined,
        type: transaction.type,
      };
      break;
    }
    // Add temporary new transaction types to prevent logging warnings
    case ETransactionType.ETO_RELEASE_FUNDS:
    case ETransactionType.ETO_RELEASE_CAPITAL_INCREASE:
    case ETransactionType.ETO_COMPANY_SIGNED_AGREEMENT:
    case ETransactionType.ETO_TERMS_SET:
    case ETransactionType.ETO_START_DATE_SET:
    case ETransactionType.NOMINEE_CONFIRMED_AGREEMENT:
    case ETransactionType.GAS_EXCHANGE:
    case ETransactionType.ICBM_FUNDS_MIGRATED:
    case ETransactionType.ICBM_FUNDS_UNLOCKED:
    case ETransactionType.ICBM_UNLOCK_PENALTY: {
      tx = undefined;
      break;
    }
    default:
      logger.warn(new Error(`Transaction with unknown type received ${transaction.type}`));
  }

  return tx;
}

export function* mapAnalyticsApiTransactionsResponse(
  _: TGlobalDependencies,
  transactions: readonly TAnalyticsTransaction[],
): Iterator<any> {
  const txHistoryTransactions: ReadonlyArray<TTxHistory | undefined> = yield all(
    transactions.map(tx => neuCall(mapAnalyticsApiTransactionResponse, tx)),
  );

  return txHistoryTransactions.filter(Boolean);
}

export function* loadTransactionsHistoryNext({
  notificationCenter,
  logger,
  analyticsApi,
}: TGlobalDependencies): Iterator<any> {
  try {
    const lastTransactionId: string | undefined = yield select(selectLastTransactionId);

    const {
      transactions,
      beforeTransaction: newLastTransactionId,
    }: TAnalyticsTransactionsResponse = yield analyticsApi.getTransactionsList(
      TX_LIMIT,
      lastTransactionId,
    );

    const processedTransactions: TTxHistory[] = yield neuCall(
      mapAnalyticsApiTransactionsResponse,
      transactions,
    );

    yield put(actions.txHistory.appendTransactions(processedTransactions, newLastTransactionId));
  } catch (e) {
    notificationCenter.error(createMessage(ETxHistoryMessage.TX_HISTORY_FAILED_TO_LOAD_NEXT));

    logger.error("Error while loading next page of transaction history", e);
  }
}

export function* loadTransactionsHistory({
  notificationCenter,
  logger,
  analyticsApi,
}: TGlobalDependencies): Iterator<any> {
  try {
    const {
      transactions,
      beforeTransaction: lastTransactionId,
      version: newTimestampOfLastChange,
    }: TAnalyticsTransactionsResponse = yield analyticsApi.getTransactionsList(TX_LIMIT);

    const processedTransactions = yield neuCall(mapAnalyticsApiTransactionsResponse, transactions);

    yield put(
      actions.txHistory.setTransactions(
        processedTransactions,
        lastTransactionId,
        newTimestampOfLastChange,
      ),
    );

    yield put(actions.txHistory.startWatchingForNewTransactions());
  } catch (e) {
    notificationCenter.error(createMessage(ETxHistoryMessage.TX_HISTORY_FAILED_TO_LOAD));

    logger.error("Error while loading transaction history", e);

    yield put(actions.txHistory.setTransactions([], undefined, undefined));
  }
}

export function* watchTransactions({ analyticsApi, logger }: TGlobalDependencies): Iterator<any> {
  while (true) {
    yield delay(TX_POLLING_INTERVAL);

    const timestampOfLastChange: number | undefined = yield select(selectTimestampOfLastChange);

    if (timestampOfLastChange === undefined) {
      logger.error(
        new Error("Transaction latest version can't be undefined. Stopping transaction polling"),
      );
      break;
    }

    const {
      version: newTimestampOfLastChange,
      transactions,
      beforeTransaction: lastTransactionId,
    }: TAnalyticsTransactionsResponse = yield analyticsApi.getUpdatedTransactions(
      timestampOfLastChange,
    );

    // check if version is higher than existing and of we have new transactions
    if (
      newTimestampOfLastChange !== undefined &&
      newTimestampOfLastChange > timestampOfLastChange &&
      transactions.length > 0
    ) {
      const processedTransactions: TTxHistory[] = yield neuCall(
        mapAnalyticsApiTransactionsResponse,
        transactions,
      );

      yield put(
        actions.txHistory.updateTransactions(
          processedTransactions,
          lastTransactionId,
          newTimestampOfLastChange,
        ),
      );
    }
  }
}

function* showTransactionDetails(
  _: TGlobalDependencies,
  action: TActionFromCreator<typeof actions.txHistory.showTransactionDetails>,
): Iterator<any> {
  const transaction = yield select((state: IAppState) => selectTXById(action.payload.id, state));

  if (!transaction) {
    throw new Error(`Transaction should be defined for ${action.payload.id}`);
  }

  yield put(
    actions.genericModal.showModal(TransactionDetailsModal, {
      transaction,
    }),
  );
}

export function* txHistorySaga(): Iterator<any> {
  yield fork(neuTakeLatest, actions.txHistory.loadTransactions, loadTransactionsHistory);
  yield fork(neuTakeLatest, actions.txHistory.loadNextTransactions, loadTransactionsHistoryNext);
  yield fork(neuTakeLatest, actions.txHistory.showTransactionDetails, showTransactionDetails);
  yield fork(
    neuTakeUntil,
    actions.txHistory.startWatchingForNewTransactions,
    actions.txHistory.stopWatchingForNewTransactions,
    watchTransactions,
  );
}
