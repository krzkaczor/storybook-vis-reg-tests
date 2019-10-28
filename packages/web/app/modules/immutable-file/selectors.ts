import { IAppState } from "../../store";

export const selectPendingDownloads = (state: IAppState): { [ipfsHash: string]: boolean } =>
  state.immutableStorage.pendingDownloads;
