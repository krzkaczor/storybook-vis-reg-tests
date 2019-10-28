import { createActionFactory } from "@neufund/shared";

export const profileActions = {
  addNewEmail: createActionFactory("PROFILE_ADD_NEW_EMAIL", (email: string) => ({
    email,
  })),
  cancelEmail: createActionFactory("PROFILE_CANCEL_EMAIL"),
  revertCancelEmail: createActionFactory("PROFILE_REVERT_CANCEL_EMAIL"),
  resendEmail: createActionFactory("PROFILE_RESEND_EMAIL"),
  loadSeedOrReturnToProfile: createActionFactory("LOAD_SEED_OR_RETURN_TO_PROFILE"),
  abortEmailUpdate: createActionFactory("PROFILE_ABORT_EMAIL_UPDATE"),
};
