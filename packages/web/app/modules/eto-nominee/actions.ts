import { createActionFactory } from "@neufund/shared";

import { TNomineeRequestStorage } from "../nominee-flow/types";

export const etoNomineeActions = {
  getNomineeRequests: createActionFactory("ETO_NOMINEE_GET_NOMINEE_REQUESTS"),
  storeNomineeRequests: createActionFactory(
    "ETO_NOMINEE_STORE_NOMINEE_REQUESTS",
    (requests: TNomineeRequestStorage) => ({ requests }),
  ),
  startNomineeRequestsWatcher: createActionFactory("ETO_NOMINEE_START_NOMINEE_REQUESTS_WATCHER"),
  stopNomineeRequestsWatcher: createActionFactory("ETO_NOMINEE_STOP_NOMINEE_REQUESTS_WATCHER"),
  acceptNomineeRequest: createActionFactory(
    "ETO_NOMINEE_ACCEPT_NOMINEE_REQUEST",
    (nomineeId: string) => ({ nomineeId }),
  ),
  rejectNomineeRequest: createActionFactory(
    "ETO_NOMINEE_REJECT_NOMINEE_REQUEST",
    (nomineeId: string) => ({ nomineeId }),
  ),
  deleteNomineeRequest: createActionFactory("ETO_NOMINEE_REQUESTS_DELETE_REQUEST"),
  loadingDone: createActionFactory("ETO_NOMINEE_REQUESTS_LOADING_DONEY"),
};
