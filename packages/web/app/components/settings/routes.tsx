import { appRoutes } from "../appRoutes";

const parentRoutePath = appRoutes.profile;

export const profileRoutes = {
  seedBackup: parentRoutePath + "/seed-backup",
};
