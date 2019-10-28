import { createActionFactory } from "@neufund/shared";

import { GasModelShape } from "../../lib/api/gas/GasApi";

export const gasActions = {
  gasApiEnsureLoading: createActionFactory("GAS_API_ENSURE_LOADING"),
  gasApiStartLoading: createActionFactory("GAS_API_START_LOADING"),
  gasApiLoaded: createActionFactory(
    "GAS_API_LOADED",
    (payload: { data?: GasModelShape; error?: string }) => payload,
  ),
};
