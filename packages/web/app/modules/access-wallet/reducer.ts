import { TMessage } from "../../components/translatedMessages/utils";
import { AppReducer } from "../../store";
import { DeepReadonly } from "../../types";
import { actions } from "../actions";

export interface ISignMessageModalState {
  isModalOpen: boolean;
  errorMessage?: DeepReadonly<TMessage>;
  modalTitle?: DeepReadonly<TMessage>;
  modalMessage?: DeepReadonly<TMessage>;
  inputLabel?: DeepReadonly<TMessage>;
}

const initialState: ISignMessageModalState = {
  isModalOpen: false,
};

export const accessWalletReducer: AppReducer<ISignMessageModalState> = (
  state = initialState,
  action,
): ISignMessageModalState => {
  switch (action.type) {
    case actions.accessWallet.showAccessWalletModal.getType():
      return {
        ...state,
        isModalOpen: true,
        errorMessage: undefined,
        modalTitle: action.payload.title,
        modalMessage: action.payload.message,
        inputLabel: action.payload.inputLabel,
      };
    case actions.accessWallet.hideAccessWalletModal.getType():
      return {
        ...state,
        isModalOpen: false,
      };
    case actions.accessWallet.signingError.getType():
      return {
        ...state,
        errorMessage: action.payload.errorMessage,
      };
    case actions.accessWallet.clearSigningError.getType():
    case actions.accessWallet.accept.getType():
      return {
        ...state,
        errorMessage: undefined,
      };
  }

  return state;
};

export const selectIsSigning = (state: ISignMessageModalState): boolean => state.isModalOpen;
