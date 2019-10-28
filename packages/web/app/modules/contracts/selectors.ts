import { IAppState } from "../../store";

export const selectPlatformTermsConstants = (state: IAppState) =>
  state.contracts.platformTermsConstants;
