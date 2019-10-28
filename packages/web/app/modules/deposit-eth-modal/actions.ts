import { createSimpleAction } from "../actionsUtils";

// TODO: Remove this module as use generic modal
export const depositModalActions = {
  showDepositEthModal: () => createSimpleAction("DEPOSIT_ETH_MODAL_SHOW"),
  hideDepositEthModal: () => createSimpleAction("DEPOSIT_ETH_MODAL_HIDE"),
};
