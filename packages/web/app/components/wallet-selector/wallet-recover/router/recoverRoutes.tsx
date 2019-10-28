import { appRoutes } from "../../../appRoutes";

const parentRoutePath = appRoutes.restore;

export const recoverRoutes = {
  success: parentRoutePath + "/success",
  seed: parentRoutePath + "/seed",
  help: parentRoutePath + "/help",
};
