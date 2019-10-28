import { createSelector } from "reselect";

import { TxPendingWithMetadata, TxWithMetadata } from "../../../lib/api/users/interfaces";
import { IAppState } from "../../../store";
import { ETxSenderState } from "../sender/reducer";

export const selectAreTherePlatformPendingTxs = (state: IAppState): boolean => {
  const pendingTransaction = state.txMonitor.txs.pendingTransaction;
  return !!pendingTransaction && pendingTransaction.transactionStatus === ETxSenderState.MINING;
};

export const selectPlatformPendingTransaction = (
  state: IAppState,
): TxPendingWithMetadata | undefined =>
  state.txMonitor.txs.pendingTransaction as TxPendingWithMetadata | undefined;

export const selectExternalPendingTransaction = (state: IAppState): TxWithMetadata | undefined =>
  state.txMonitor.txs.oooTransactions[0];

export const selectAreTherePendingTxs = createSelector(
  selectAreTherePlatformPendingTxs,
  selectExternalPendingTransaction,
  (areTherePlatformPendingTxs, externalPendingTransaction) =>
    areTherePlatformPendingTxs || !!externalPendingTransaction,
);
