import { AppReducer } from "../../store";
import { DeepReadonly } from "../../types";

export enum EInvestmentType {
  Eth = "ETH",
  NEur = "NEUR",
  ICBMEth = "ICBM_ETH",
  ICBMnEuro = "ICBM_NEUR",
}

export enum EInvestmentErrorState {
  AboveMaximumTicketSize = "above_maximum_ticket_size",
  BelowMinimumTicketSize = "below_minimum_ticket_size",
  ExceedsTokenAmount = "exceeds_token_amount",
  ExceedsWalletBalance = "exceeds_wallet_balance",
}

export interface IInvestmentFlowState {
  etoId: string;
  euroValueUlps: string;
  ethValueUlps: string;
  investmentType?: EInvestmentType;
  activeInvestmentTypes: EInvestmentType[];
  errorState?: EInvestmentErrorState;
  isValidatedInput: boolean;
}

export const investmentFlowInitialState: IInvestmentFlowState = {
  etoId: "",
  euroValueUlps: "",
  ethValueUlps: "",
  investmentType: EInvestmentType.Eth,
  activeInvestmentTypes: [],
  isValidatedInput: false,
};

export const investmentFlowReducer: AppReducer<IInvestmentFlowState> = (
  state = investmentFlowInitialState,
  action,
): DeepReadonly<IInvestmentFlowState> => {
  switch (action.type) {
    case "INVESTMENT_FLOW_RESET":
      return investmentFlowInitialState;
    case "INVESTMENT_FLOW_SELECT_INVESTMENT_TYPE":
      return {
        ...investmentFlowInitialState,
        etoId: state.etoId,
        activeInvestmentTypes: state.activeInvestmentTypes,
        investmentType: action.payload.type,
      };
    case "INVESTMENT_FLOW_SET_ETO_ID":
      return {
        ...state,
        etoId: action.payload.etoId,
      };
    case "INVESTMENT_FLOW_SET_INVESTMENT_ERROR_STATE":
      return {
        ...state,
        errorState: action.payload.errorState,
      };
    case "INVESTMENT_FLOW_SET_INVESTMENT_ETH_VALUE":
      return {
        ...state,
        ethValueUlps: action.payload.value,
      };
    case "INVESTMENT_FLOW_SET_INVESTMENT_EUR_VALUE":
      return {
        ...state,
        euroValueUlps: action.payload.value,
      };
    case "INVESTMENT_FLOW_SET_IS_INPUT_VALIDATED":
      return {
        ...state,
        isValidatedInput: action.payload.isValidated,
      };
    case "INVESTMENT_FLOW_SET_ACTIVE_INVESTMENT_TYPES":
      return {
        ...state,
        ...action.payload,
      };
  }

  return state;
};
