import { createSimpleAction } from "../actionsUtils";

export const verifyEmailActions = {
  lockVerifyEmailButton: () => createSimpleAction("VERIFY_EMAIL_BUTTON_LOCK"),
  freeVerifyEmailButton: () => createSimpleAction("VERIFY_EMAIL_BUTTON_UNLOCK"),
};

//TODO: add typings to action
