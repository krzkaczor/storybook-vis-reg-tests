import { AppReducer } from "../../store";
import { DeepReadonly } from "../../types";

export interface IDepositEthModal {
  isOpen: boolean;
}

export interface IDepositEthModalState {
  isOpen: boolean;
  depositEthModalObj?: IDepositEthModal;
}

const initialState: IDepositEthModalState = {
  isOpen: false,
};

export const depositEthModalReducer: AppReducer<IDepositEthModalState> = (
  state = initialState,
  action,
): DeepReadonly<IDepositEthModalState> => {
  switch (action.type) {
    case "DEPOSIT_ETH_MODAL_SHOW":
      return {
        isOpen: true,
      };
    case "DEPOSIT_ETH_MODAL_HIDE":
      return {
        isOpen: false,
      };
    default:
      return state;
  }
};
