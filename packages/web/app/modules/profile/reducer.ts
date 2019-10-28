import { AppReducer } from "../../store";
import { DeepReadonly } from "../../types";
import { actions } from "../actions";

export interface IProfile {
  isEmailTemporaryCancelled: boolean;
}

const initialState: IProfile = {
  isEmailTemporaryCancelled: false,
};

export const profileReducer: AppReducer<IProfile> = (
  state = initialState,
  action,
): DeepReadonly<IProfile> => {
  switch (action.type) {
    case actions.profile.cancelEmail.getType():
      return {
        ...state,
        isEmailTemporaryCancelled: true,
      };
    case actions.profile.addNewEmail.getType():
    case actions.profile.revertCancelEmail.getType():
      return {
        ...state,
        isEmailTemporaryCancelled: false,
      };
  }

  return state;
};

export const selectIsCancelEmail = (state: IProfile): boolean => state.isEmailTemporaryCancelled;
