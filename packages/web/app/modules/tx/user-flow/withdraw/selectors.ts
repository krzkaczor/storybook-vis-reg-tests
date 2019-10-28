import { IAppState } from "../../../../store";
import { TxUserFlowDetails, TxUserFlowInputData } from "./reducer";

export type TSelectUserFlowDetails = Required<TxUserFlowDetails>;

export const selectUserFlowTxDetails = (state: IAppState): TSelectUserFlowDetails => {
  const txUserFlowDetails = state.txUserFlowWithdraw.txUserFlowDetails;
  return {
    transferAllValue: txUserFlowDetails.transferAllValue || "0",
    inputValue: txUserFlowDetails.inputValue,
    inputValueEuro: txUserFlowDetails.inputValueEuro,
    inputTo: txUserFlowDetails.inputTo || "0x",
    totalValue: txUserFlowDetails.totalValue,
    totalValueEur: txUserFlowDetails.totalValueEur,
    transactionCost: txUserFlowDetails.transactionCost,
    transactionCostEur: txUserFlowDetails.transactionCostEur,
  };
};

export const selectUserFlowTxInput = (state: IAppState): TxUserFlowInputData =>
  state.txUserFlowWithdraw.txUserFlowInputData;
