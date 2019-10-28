import { AppReducer } from "../../../../store";
import { actions } from "../../../actions";

export type TxUserFlowDetails = {
  transferAllValue?: string;
  inputValue: string;
  inputValueEuro: string;
  inputTo?: string;
  totalValue: string;
  totalValueEur: string;
  transactionCost: string;
  transactionCostEur: string;
};

export type TxUserFlowInputData = {
  to: string;
  value: string;
};

export interface ITxUserFlowState {
  txUserFlowDetails: TxUserFlowDetails;
  txUserFlowInputData: TxUserFlowInputData;
}

const initialState: ITxUserFlowState = {
  txUserFlowInputData: { to: "", value: "" },
  txUserFlowDetails: {
    inputValue: "0",
    inputValueEuro: "0",
    totalValue: "0",
    totalValueEur: "0",
    transactionCost: "0",
    transactionCostEur: "0",
  },
};

export const txUserFlowWithdrawReducer: AppReducer<ITxUserFlowState> = (
  state = initialState,
  action,
): ITxUserFlowState => {
  switch (action.type) {
    // Modal related Actions
    case actions.txUserFlowWithdraw.setTxUserFlowData.getType():
      return {
        ...state,
        txUserFlowDetails: { ...state.txUserFlowDetails, ...action.payload.txUserFlowData },
      };
    case actions.txUserFlowWithdraw.setTxUserFlowInputData.getType():
      return {
        ...state,
        txUserFlowInputData: {
          ...state.txUserFlowInputData,
          ...action.payload.txUserFlowInputData,
        },
      };
    case actions.txUserFlowWithdraw.clearDraftTx.getType():
      return initialState;
  }

  return state;
};

// TODO:CHANGE NAMING OF TX DETAILS
