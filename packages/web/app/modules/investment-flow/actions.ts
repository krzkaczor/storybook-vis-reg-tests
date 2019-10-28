import { ECurrency } from "../../components/shared/formatters/utils";
import { createAction, createSimpleAction } from "../actionsUtils";
import { EInvestmentErrorState, EInvestmentType } from "./reducer";

export const investmentFlowActions = {
  // public actions
  startInvestment: (etoId: string) => createAction("INVESTMENT_FLOW_START", { etoId }),
  resetInvestment: () => createSimpleAction("INVESTMENT_FLOW_RESET"),
  selectInvestmentType: (type?: EInvestmentType) =>
    createAction("INVESTMENT_FLOW_SELECT_INVESTMENT_TYPE", { type }),
  submitCurrencyValue: (value: string, currency: ECurrency) =>
    createAction("INVESTMENT_FLOW_SUBMIT_INVESTMENT_VALUE", { value, currency }),
  investEntireBalance: () => createSimpleAction("INVESTMENT_FLOW_INVEST_ENTIRE_BALANCE"),
  validateInputs: () => createSimpleAction("INVESTMENT_FLOW_VALIDATE_INPUTS"),

  // state mutations
  setEtoId: (etoId: string) => createAction("INVESTMENT_FLOW_SET_ETO_ID", { etoId }),
  setEthValue: (value: string) =>
    createAction("INVESTMENT_FLOW_SET_INVESTMENT_ETH_VALUE", { value }),
  setEurValue: (value: string) =>
    createAction("INVESTMENT_FLOW_SET_INVESTMENT_EUR_VALUE", { value }),
  setErrorState: (errorState?: EInvestmentErrorState) =>
    createAction("INVESTMENT_FLOW_SET_INVESTMENT_ERROR_STATE", { errorState }),
  setIsInputValidated: (isValidated: boolean) =>
    createAction("INVESTMENT_FLOW_SET_IS_INPUT_VALIDATED", { isValidated }),
  setActiveInvestmentTypes: (activeInvestmentTypes: EInvestmentType[]) =>
    createAction("INVESTMENT_FLOW_SET_ACTIVE_INVESTMENT_TYPES", { activeInvestmentTypes }),
};
