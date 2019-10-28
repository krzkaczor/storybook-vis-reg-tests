import { AppReducer } from "../../store";
import { DeepReadonly } from "../../types";
import { actions } from "../actions";

export interface IImmutableStorageState {
  pendingDownloads: { [ipfsHash: string]: boolean };
}

export const immutableStorageInitialState: IImmutableStorageState = {
  pendingDownloads: {},
};

export const immutableStorageReducer: AppReducer<IImmutableStorageState> = (
  state = immutableStorageInitialState,
  action,
): DeepReadonly<IImmutableStorageState> => {
  switch (action.type) {
    case actions.immutableStorage.downloadImmutableFile.getType(): {
      return {
        ...state,
        pendingDownloads: {
          ...state.pendingDownloads,
          [action.payload.immutableFileId.ipfsHash]: true,
        },
      };
    }
    case actions.immutableStorage.downloadDocumentStarted.getType(): {
      return {
        ...state,
        pendingDownloads: {
          ...state.pendingDownloads,
          [action.payload.ipfsHash]: true,
        },
      };
    }
    case actions.immutableStorage.downloadImmutableFileDone.getType(): {
      return {
        ...state,
        pendingDownloads: {
          ...state.pendingDownloads,
          [action.payload.ipfsHash]: false,
        },
      };
    }
  }

  return state;
};
