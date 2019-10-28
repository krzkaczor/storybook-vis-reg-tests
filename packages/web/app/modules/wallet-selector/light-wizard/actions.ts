import { createActionFactory } from "@neufund/shared";

import { TMessage } from "../../../components/translatedMessages/utils";

export const lightWizardActions = {
  lightWalletConnectionError: createActionFactory(
    "LIGHT_WALLET_CONNECTION_ERROR",
    (errorMsg: TMessage) => ({ errorMsg }),
  ),
  lightWalletReset: createActionFactory("LIGHT_WALLET_RESET"),
  lightWalletLogin: createActionFactory(
    "LIGHT_WALLET_LOGIN",
    (email: string, password: string) => ({ email, password }),
  ),
  lightWalletRecover: createActionFactory(
    "LIGHT_WALLET_RECOVER",
    (email: string, password: string, seed: string) => ({ email, password, seed }),
  ),
  lightWalletBackedUp: createActionFactory("LIGHT_WALLET_BACKUP"),
  lightWalletRegister: createActionFactory(
    "LIGHT_WALLET_REGISTER",
    (email: string, password: string) => ({ email, password }),
  ),
};
