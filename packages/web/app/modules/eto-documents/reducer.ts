import { EEtoDocumentType, IEtoFilesInfo } from "../../lib/api/eto/EtoFileApi.interfaces";
import { AppReducer } from "../../store";
import { DeepReadonly } from "../../types";
import { actions } from "../actions";

export interface IEtoDocumentState {
  loading: boolean;
  saving: boolean;
  showIpfsModal: boolean;
  etoFilesInfo: IEtoFilesInfo;
  uploadAction?: () => void;
  uploading: { [key in EEtoDocumentType]?: boolean };
  downloading: { [key in EEtoDocumentType]?: boolean };
}

export const etoFlowInitialState: IEtoDocumentState = {
  loading: false,
  saving: false,
  etoFilesInfo: {
    productTemplates: {},
  },
  showIpfsModal: false,
  uploading: {},
  downloading: {},
};

export const etoDocumentReducer: AppReducer<IEtoDocumentState> = (
  state = etoFlowInitialState,
  action,
): DeepReadonly<IEtoDocumentState> => {
  switch (action.type) {
    case actions.etoDocuments.loadFileDataStart.getType():
      return {
        ...state,
        loading: true,
      };
    case actions.etoDocuments.loadEtoFilesInfo.getType():
      return {
        ...state,
        etoFilesInfo: { ...state.etoFilesInfo, ...action.payload.data },
        loading: false,
        saving: false,
      };
    case actions.etoDocuments.etoUploadDocumentStart.getType():
      return {
        ...state,
        saving: true,
        uploading: { ...state.uploading, [action.payload.documentType]: true },
      };
    case actions.etoDocuments.etoUploadDocumentFinish.getType():
      return {
        ...state,
        uploading: { ...state.uploading, [action.payload.documentType]: false },
      };
    case actions.etoDocuments.downloadDocumentStart.getType():
      return {
        ...state,
        downloading: { ...state.downloading, [action.payload.documentType]: true },
      };
    case actions.etoDocuments.downloadDocumentFinish.getType():
      return {
        ...state,
        downloading: { ...state.downloading, [action.payload.documentType]: false },
      };
    case actions.etoDocuments.showIpfsModal.getType():
      return {
        ...state,
        uploadAction: action.payload.fileUploadAction,
        showIpfsModal: true,
      };
    case actions.etoDocuments.hideIpfsModal.getType():
      return {
        ...state,
        uploadAction: undefined,
        showIpfsModal: false,
      };
  }

  return state;
};
