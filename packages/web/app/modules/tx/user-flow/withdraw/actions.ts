import { createActionFactory } from "@neufund/shared";

import { TxUserFlowDetails, TxUserFlowInputData } from "./reducer";

export const txUserFlowWithdrawActions = {
  // STATE SETTERS
  setTxUserFlowData: createActionFactory(
    "TX_USER_FLOW_SET_DATA",
    (txUserFlowData: TxUserFlowDetails) => ({
      txUserFlowData,
    }),
  ),
  setTxUserFlowInputData: createActionFactory(
    "TX_USER_FLOW_SET_INPUT_DATA",
    (txUserFlowInputData: TxUserFlowInputData) => ({
      txUserFlowInputData,
    }),
  ),
  clearDraftTx: createActionFactory("TX_USER_FLOW_CLEAR_DRAFT_TX"),
  runUserFlowOperations: createActionFactory(
    "TX_USER_FLOW_DETECT_WITHDRAW_MAX",
    (txUserFlowData: TxUserFlowInputData) => ({
      ...txUserFlowData,
    }),
  ),
  userFlowAcceptForm: createActionFactory("TX_USER_FLOW_ACCEPT_FORM"),
};

// TODO: Add the case where more than one flow can have a separate user flow
