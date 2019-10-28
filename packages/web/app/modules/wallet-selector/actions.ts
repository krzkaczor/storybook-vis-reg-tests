import { createActionFactory } from "@neufund/shared";

import { TMessage } from "../../components/translatedMessages/utils";
import { browserWizardActions } from "./browser-wizard/actions";
import { ledgerWizardActions } from "./ledger-wizard/actions";
import { lightWizardActions } from "./light-wizard/actions";

const actions = {
  reset: createActionFactory("WALLET_SELECTOR_RESET"),
  connected: createActionFactory("WALLET_SELECTOR_CONNECTED"),
  messageSigning: createActionFactory("WALLET_SELECTOR_MESSAGE_SIGNING"),
  messageSigningError: createActionFactory(
    "WALLET_SELECTOR_MESSAGE_SIGNING_ERROR",
    (errorMessage: TMessage) => ({ errorMessage }),
  ),
};

export const walletSelectorActions = {
  ...browserWizardActions,
  ...ledgerWizardActions,
  ...lightWizardActions,
  ...actions,
};
