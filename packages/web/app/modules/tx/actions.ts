import { txMonitorActions } from "./monitor/actions";
import { txSenderActions } from "./sender/actions";
import { txTransactionsActions } from "./transactions/actions";
import { txUserFlowActions } from "./user-flow/actions";
import { txValidatorActions } from "./validator/actions";

export const txActions = {
  txValidator: txValidatorActions,
  txSender: txSenderActions,
  txMonitor: txMonitorActions,
  txTransactions: txTransactionsActions,
  ...txUserFlowActions,
};
