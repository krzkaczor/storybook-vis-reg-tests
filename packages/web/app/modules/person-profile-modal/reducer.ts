import { IEtoSocialProfile } from "../../components/shared/SocialProfilesList";
import { AppReducer } from "../../store";
import { DeepReadonly } from "../../types";

export interface IPersonProfileModalState {
  isOpen: boolean;
  personProfileModalObj?: IPersonProfileModal;
}

export interface IPersonProfileModal {
  image: string;
  name: string;
  role: string;
  description: string | React.ReactNode;
  socialChannels: IEtoSocialProfile[];
  website?: string;
}

const initialState: IPersonProfileModalState = {
  isOpen: false,
};

export const personProfileModalReducer: AppReducer<IPersonProfileModalState> = (
  state = initialState,
  action,
): DeepReadonly<IPersonProfileModalState> => {
  switch (action.type) {
    case "PERSON_PROFILE_MODAL_SHOW":
      return {
        ...state,
        isOpen: true,
        personProfileModalObj: action.payload,
      };
    case "PERSON_PROFILE_MODAL_HIDE":
      return {
        ...state,
        personProfileModalObj: undefined,
        isOpen: false,
      };
  }

  return state;
};

export const selectIsOpen = (state: DeepReadonly<IPersonProfileModalState>): boolean =>
  state.isOpen;
export const selectPersonProfileModalObj = (
  state: DeepReadonly<IPersonProfileModalState>,
): DeepReadonly<IPersonProfileModal> | undefined => state.personProfileModalObj;
