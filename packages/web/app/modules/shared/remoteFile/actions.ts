import { TFileDescription } from "../../../lib/api/file-storage/FileStorage.interfaces";
import { createAction } from "../../actionsUtils";

export const remoteFileActions = {
  getRemoteFile: (
    fileUrl: string,
    onDone: (error: any, fileDescription?: TFileDescription) => any,
  ) => createAction("REMOTE_FILE_GET", { fileUrl, onDone }),
};
