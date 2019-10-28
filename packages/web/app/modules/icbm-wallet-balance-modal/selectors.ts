import { DeepReadonly } from "../../types";
import { IAppState } from "./../../store";
import { IIcbmWalletBalanceModal, IWalletMigrationData, TWalletMigrationSteps } from "./reducer";

// ICBM Wallet Selectors
export const selectIcbmWalletEthAddress = (state: IAppState): string | undefined =>
  state.icbmWalletBalanceModal.icbmWalletEthAddress;

export const selectEtherNeumarksDueIcbmModal = (state: IAppState): string =>
  (state.icbmWalletBalanceModal.icbmLockedEthWallet &&
    state.icbmWalletBalanceModal.icbmLockedEthWallet.neumarksDue) ||
  "0";

export const selectEtherBalanceIcbmModal = (state: IAppState): string =>
  (state.icbmWalletBalanceModal.icbmLockedEthWallet &&
    state.icbmWalletBalanceModal.icbmLockedEthWallet.LockedBalance) ||
  "0";

// Migration Tool Selectors
export const selectWalletMigrationData = (
  state: DeepReadonly<IIcbmWalletBalanceModal>,
): ReadonlyArray<IWalletMigrationData> | undefined => state.walletMigrationData;

export const selectWalletMigrationCurrentStep = (state: IAppState): TWalletMigrationSteps =>
  state.icbmWalletBalanceModal && state.icbmWalletBalanceModal.currentMigrationStep;

export const selectIcbmModalIsMigrating = (state: IAppState): boolean =>
  state.icbmWalletBalanceModal && state.icbmWalletBalanceModal.isMigrating;

export const selectIcbmModalIsFirstTransactionDone = (state: IAppState): boolean =>
  state.icbmWalletBalanceModal && state.icbmWalletBalanceModal.firstTransactionDone;

export const selectIcbmModalIsSecondTransactionDone = (state: IAppState): boolean =>
  state.icbmWalletBalanceModal && state.icbmWalletBalanceModal.secondTransactionDone;
