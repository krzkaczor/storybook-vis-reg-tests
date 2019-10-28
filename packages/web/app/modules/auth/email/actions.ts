import { createActionFactory } from "@neufund/shared";

export const emailActions = {
  verifyEmail: createActionFactory("AUTH_VERIFY_EMAIL"),
};
