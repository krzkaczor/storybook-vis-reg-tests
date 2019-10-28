import { createActionFactory } from "@neufund/shared";

export const tosModalActions = {
  loadCurrentTos: createActionFactory("LOAD_CURRENT_TOS"),
  setCurrentTosHash: createActionFactory(
    "SET_CURRENT_TOS_HASH",
    (currentAgreementHash: string) => ({ currentAgreementHash }),
  ),
  acceptCurrentTos: createActionFactory("ACCEPT_CURRENT_TOS"),
};
