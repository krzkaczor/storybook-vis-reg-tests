import { TBrowserName } from "../../lib/dependencies/detectBrowser";
import { createAction } from "../actionsUtils";

export const userAgentActions = {
  loadUserAgentInfo: (name: TBrowserName, version: string) =>
    createAction("LOAD_USER_AGENT_INFO_ACTION", { name, version }),
};
