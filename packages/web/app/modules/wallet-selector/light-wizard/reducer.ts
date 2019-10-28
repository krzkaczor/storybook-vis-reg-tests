import { TMessage } from "../../../components/translatedMessages/utils";
import { AppReducer } from "../../../store";
import { DeepReadonly } from "../../../types";
import { actions } from "../../actions";

export interface ILightWalletWizardState {
  errorMsg?: DeepReadonly<TMessage>;
  isLoading: boolean;
}

export const lightWalletWizardInitialState: ILightWalletWizardState = { isLoading: false };

export const lightWalletWizardReducer: AppReducer<ILightWalletWizardState> = (
  state = lightWalletWizardInitialState,
  action,
): ILightWalletWizardState => {
  switch (action.type) {
    case actions.walletSelector.lightWalletLogin.getType():
    case actions.walletSelector.lightWalletRegister.getType():
      return {
        ...state,
        errorMsg: undefined,
        isLoading: true,
      };
    case actions.walletSelector.lightWalletConnectionError.getType():
      return {
        ...state,
        errorMsg: action.payload.errorMsg,
        isLoading: false,
      };
    case actions.walletSelector.connected.getType():
    case actions.walletSelector.reset.getType():
      return {
        ...state,
        isLoading: false,
        errorMsg: undefined,
      };
  }
  return state;
};
