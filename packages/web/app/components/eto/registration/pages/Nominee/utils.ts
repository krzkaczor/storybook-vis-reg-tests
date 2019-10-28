import { INomineeRequest } from "../../../../../modules/nominee-flow/types";

export const nomineeRequestsAreEmpty = (nomineeRequests: INomineeRequest[]): boolean =>
  nomineeRequests.length === 0;
