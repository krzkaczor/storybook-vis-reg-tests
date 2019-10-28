import { IAppState } from "../../store";
import { nomineeRequestsToArray } from "../nominee-flow/utils";

export const selectNomineeRequests = (state: IAppState) =>
  nomineeRequestsToArray(state.etoNominee.nomineeRequests);

export const selectEtoNomineeIsLoading = (state: IAppState): boolean => state.etoNominee.isLoading;
