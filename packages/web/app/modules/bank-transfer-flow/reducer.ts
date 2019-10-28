import { AppReducer } from "../../store";
import { DeepReadonly } from "../../types";
import { actions } from "../actions";

export enum EBankTransferFlowState {
  UNINITIALIZED = "uninitialized",
  PROCESSING = "processing",
  AGREEMENT = "agreement",
  SUMMARY = "summary",
  SUCCESS = "success",
}

export enum EBankTransferType {
  PURCHASE,
  VERIFY,
}

export interface IBankTransferState {
  state: EBankTransferFlowState;
  type: EBankTransferType | undefined;
  minEuroUlps: string;
  reference: string;
  bankFeeUlps: string;
  redeem?: {
    minEuroUlps: string;
    bankFeeUlps: string;
  };
}

export const bankTransferInitialState: IBankTransferState = {
  state: EBankTransferFlowState.UNINITIALIZED,
  type: undefined,
  minEuroUlps: "",
  reference: "",
  bankFeeUlps: "",
};

export const bankTransferFlowReducer: AppReducer<IBankTransferState> = (
  state = bankTransferInitialState,
  action,
): DeepReadonly<IBankTransferState> => {
  switch (action.type) {
    case actions.bankTransferFlow.startBankTransfer.getType():
    case actions.bankTransferFlow.continueProcessing.getType():
      return {
        ...state,
        state: EBankTransferFlowState.PROCESSING,
      };

    case actions.bankTransferFlow.setTransferDetails.getType():
      return {
        ...state,
        reference: action.payload.reference,
        minEuroUlps: action.payload.minEuroUlps,
        type: action.payload.type,
      };

    case actions.bankTransferFlow.continueToAgreement.getType():
      return {
        ...state,
        state: EBankTransferFlowState.AGREEMENT,
      };

    case actions.bankTransferFlow.continueToSummary.getType():
      return {
        ...state,
        state: EBankTransferFlowState.SUMMARY,
      };
    case actions.bankTransferFlow.continueToSuccess.getType():
      return {
        ...state,
        state: EBankTransferFlowState.SUCCESS,
      };
    case actions.bankTransferFlow.setRedeemData.getType():
      return {
        ...state,
        redeem: {
          minEuroUlps: action.payload.redeemMinEuroUlps,
          bankFeeUlps: action.payload.redeemBankFeeUlps,
        },
      };

    case actions.bankTransferFlow.stopBankTransfer.getType():
      return {
        redeem: state.redeem,
        ...bankTransferInitialState,
      };
  }

  return state;
};
