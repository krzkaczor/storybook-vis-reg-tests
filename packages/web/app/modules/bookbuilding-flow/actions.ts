import { createActionFactory } from "@neufund/shared";

import { IPledge } from "../../lib/api/eto/EtoPledgeApi.interfaces.unsafe";

export const bookBuildingFlowActions = {
  loadBookBuildingStats: createActionFactory("LOAD_BOOKBUILDING_FLOW_STATS", (etoId: string) => ({
    etoId,
  })),
  setBookBuildingStats: createActionFactory(
    "SET_BOOKBUILDING_FLOW_STATS",
    (etoId: string, stats: any) => ({ stats, etoId }),
  ),
  loadPledge: createActionFactory("LOAD_PLEDGE", (etoId: string) => ({ etoId })),
  savePledge: createActionFactory("SAVE_PLEDGE", (etoId: string, pledge: IPledge) => ({
    etoId,
    pledge,
  })),
  deletePledge: createActionFactory("DELETE_PLEDGE", (etoId: string) => ({ etoId })),
  setPledge: createActionFactory("SET_PLEDGE", (etoId: string, pledge?: IPledge) => ({
    etoId,
    pledge,
  })),
  bookBuildingStartWatch: createActionFactory("WATCH_BOOKBUILDING_FLOW_STATS", (etoId: string) => ({
    etoId,
  })),
  bookBuildingStopWatch: createActionFactory(
    "UNWATCH_BOOKBUILDING_FLOW_STATS",
    (etoId: string) => ({ etoId }),
  ),
};
