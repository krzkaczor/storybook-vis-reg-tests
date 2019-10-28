import { createActionFactory } from "@neufund/shared";

import { IDraftType } from "../types";
import { EValidationState } from "../validator/reducer";
import { EAdditionalValidationDataNotifications } from "./reducer";

export const txValidatorActions = {
  validateDraft: createActionFactory("TX_SENDER_VALIDATE_DRAFT", (txDraft: IDraftType) => txDraft),
  setValidationState: createActionFactory(
    "TX_SENDER_SET_VALIDATION_STATE",
    (validationState: EValidationState) => ({ validationState }),
  ),
  clearValidationState: createActionFactory("TX_SENDER_CLEAR_VALIDATION_STATE"),
  setValidationNotifications: createActionFactory(
    "TX_SENDER_SET_VALIDATION_NOTIFICATIONS",
    (validationWarnings: EAdditionalValidationDataNotifications[]) => validationWarnings,
  ),
};
