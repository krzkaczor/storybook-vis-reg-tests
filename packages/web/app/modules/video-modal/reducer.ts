import { AppReducer } from "../../store";
import { DeepReadonly } from "../../types";

export interface IVideoModalState {
  isOpen: boolean;
  videoModalObj?: IVideoModal;
}

export interface IVideoModal {
  youTubeUrl: string;
}

const initialState: IVideoModalState = {
  isOpen: false,
};

export const videoModalReducer: AppReducer<IVideoModalState> = (
  state = initialState,
  action,
): DeepReadonly<IVideoModalState> => {
  switch (action.type) {
    case "VIDEO_MODAL_SHOW":
      return {
        ...state,
        isOpen: true,
        videoModalObj: action.payload,
      };
    case "VIDEO_MODAL_HIDE":
      return {
        ...state,
        videoModalObj: undefined,
        isOpen: false,
      };
  }

  return state;
};

export const selectVideoModalIsOpen = (state: IVideoModalState): boolean => state.isOpen;
export const selectVideoModalObj = (state: IVideoModalState): IVideoModal | undefined =>
  state.videoModalObj;
