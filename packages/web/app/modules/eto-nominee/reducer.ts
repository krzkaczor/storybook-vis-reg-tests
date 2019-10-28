import { AppReducer } from "../../store";
import { DeepReadonly } from "../../types";
import { actions } from "../actions";
import { TNomineeRequestStorage } from "../nominee-flow/types";

export interface IEtoNomineeState {
  isLoading: boolean;
  nomineeRequests: TNomineeRequestStorage;
}

const etoNomineeInitialState: IEtoNomineeState = {
  isLoading: false,
  nomineeRequests: {},
};

export const etoNomineeReducer: AppReducer<IEtoNomineeState> = (
  state = etoNomineeInitialState,
  action,
): DeepReadonly<IEtoNomineeState> => {
  switch (action.type) {
    case actions.etoNominee.acceptNomineeRequest.getType():
    case actions.etoNominee.rejectNomineeRequest.getType():
    case actions.etoNominee.getNomineeRequests.getType():
    case actions.etoNominee.deleteNomineeRequest.getType():
      return {
        ...state,
        isLoading: true,
      };
    case actions.etoNominee.storeNomineeRequests.getType():
      return {
        ...state,
        nomineeRequests: action.payload.requests,
        isLoading: false,
      };
    case actions.etoNominee.loadingDone.getType():
      //recover after network failure etc
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};
