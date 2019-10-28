import { txMonitorReducer } from "./monitor/reducer";
import { txSenderReducer } from "./sender/reducer";
import { txUserFlowReducers } from "./user-flow/reducer";
import { txValidatorReducer } from "./validator/reducer";

export const txReducers = {
  ...txUserFlowReducers,
  txValidator: txValidatorReducer,
  txSender: txSenderReducer,
  txMonitor: txMonitorReducer,
};
