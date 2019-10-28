import { EEtoState } from "../../lib/api/eto/EtoApi.interfaces.unsafe";
import { EEtoDocumentType, IEtoFilesInfo } from "../../lib/api/eto/EtoFileApi.interfaces";
import { EUserType } from "../../lib/api/users/interfaces";
import { IAppState } from "../../store";
import { DeepReadonly } from "../../types";
import { selectUserType } from "../auth/selectors";
import { selectIssuerEtoState } from "../eto-flow/selectors";
import { selectNomineeEtoState } from "../nominee-flow/selectors";
import { IEtoDocumentState } from "./reducer";

export const selectIsIpfsModalOpen = (state: DeepReadonly<IEtoDocumentState>): boolean =>
  state.showIpfsModal;

export const selectFileUploadAction = (
  state: DeepReadonly<IEtoDocumentState>,
): (() => void) | undefined => state.uploadAction;

export const selectEtoDocumentsLoading = (state: DeepReadonly<IEtoDocumentState>): boolean =>
  state.loading;

export const selectEtoDocumentData = (
  state: DeepReadonly<IEtoDocumentState>,
): DeepReadonly<IEtoFilesInfo> => state.etoFilesInfo;

export const selectEtoDocumentsDownloading = (
  state: DeepReadonly<IEtoDocumentState>,
): { [key in EEtoDocumentType]?: boolean } => state.downloading;

export const selectEtoDocumentsUploading = (
  state: DeepReadonly<IEtoDocumentState>,
): { [key in EEtoDocumentType]?: boolean } => state.uploading;

export const selectEtoState = (state: IAppState): EEtoState => {
  const userType = selectUserType(state);
  const etoState =
    userType === EUserType.NOMINEE ? selectNomineeEtoState(state) : selectIssuerEtoState(state);
  if (userType === undefined || etoState === undefined) {
    throw new Error("invalid app state");
  } else {
    return etoState;
  }
};
