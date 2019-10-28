import { createActionFactory } from "@neufund/shared";

import { TCompanyEtoData, TEtoSpecsData } from "../../lib/api/eto/EtoApi.interfaces.unsafe";
import { Dictionary } from "../../types";
import { ENomineeRequestError, INomineeRequest } from "./types";

export const nomineeFlowActions = {
  loadNomineeEtos: createActionFactory("NOMINEE_FLOW_LOAD_ETOS"),
  loadNomineeTaskData: createActionFactory("NOMINEE_FLOW_LOAD_NOMINEE_TASK_DATA"),
  storeNomineeTaskData: createActionFactory("NOMINEE_FLOW_SET_NOMINEE_TASKS_STATUS", tasks => ({
    tasks,
  })),
  startNomineeRequestsWatcher: createActionFactory("NOMINEE_FLOW_START_NOMINEE_REQUESTS_WATCHER"),
  stopNomineeRequestsWatcher: createActionFactory("NOMINEE_FLOW_STOP_NOMINEE_REQUESTS_WATCHER"),
  createNomineeRequest: createActionFactory(
    "NOMINEE_FLOW_CREATE_NOMINEE_REQUEST",
    (issuerId: string) => ({ issuerId }),
  ),
  storeNomineeRequest: createActionFactory(
    "NOMINEE_FLOW_SET_NOMINEE_LINK_REQUEST",
    (etoId: string, nomineeRequest: INomineeRequest) => ({ etoId, nomineeRequest }),
  ),
  storeNomineeRequestError: createActionFactory(
    "NOMINEE_FLOW_SET_NOMINEE_LINK_REQUEST_ERROR",
    (etoId: string, requestError: ENomineeRequestError) => ({ etoId, requestError }),
  ),
  loadingDone: createActionFactory("NOMINEE_FLOW_LOADING_DONE"),
  trySetActiveNomineeEto: createActionFactory(
    "NOMINEE_FLOW_TRY_SET_ACTIVE_ETO",
    (previewCode: string) => ({ previewCode }),
  ),
  setActiveNomineeEto: createActionFactory(
    "NOMINEE_FLOW_SET_ACTIVE_ETO",
    (previewCode: string | undefined) => ({ previewCode }),
  ),
  changeActiveNomineeEto: createActionFactory(
    "NOMINEE_FLOW_CHANGE_ACTIVE_ETO",
    (etoId: string | undefined) => ({ etoId }),
  ),
  setNomineeEtos: createActionFactory(
    "NOMINEE_FLOW_SET_ETOS",
    ({
      etos,
      companies,
    }: {
      etos: Dictionary<TEtoSpecsData>;
      companies: Dictionary<TCompanyEtoData>;
    }) => ({ etos, companies }),
  ),
};
