import { GasModelShape } from "../../lib/api/gas/GasApi";
import { AppReducer } from "../../store";
import { DeepReadonly } from "../../types";
import { actions } from "../actions";

export interface IGasState {
  loading: boolean;
  gasPrice?: GasModelShape;
  error?: string;
}

export const gasInitialState: IGasState = {
  loading: false,
};

export const gasReducer: AppReducer<IGasState> = (
  state = gasInitialState,
  action,
): DeepReadonly<IGasState> => {
  switch (action.type) {
    case actions.gas.gasApiStartLoading.getType():
      return {
        ...state,
        loading: true,
      };
    case actions.gas.gasApiLoaded.getType():
      return {
        ...state,
        gasPrice: action.payload.data || state.gasPrice,
        error: action.payload.error,
      };
  }

  return state;
};
