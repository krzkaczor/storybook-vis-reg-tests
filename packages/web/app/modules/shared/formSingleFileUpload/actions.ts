import { createAction } from "../../actionsUtils";

export const formSingleFileUploadActions = {
  uploadFileStart: (file: File, onDone: (error: any, fileUrl?: string) => any) =>
    createAction("FORM_SINGLE_FILE_UPLOAD_START", { file, onDone }),
  getFileStart: (fileUrl: string, onDone: (error: any, fileInfo?: any) => any) =>
    createAction("FORM_SINGLE_FILE_GET_START", { fileUrl, onDone }),
};
