import { appRoutes } from "../appRoutes";

export const parentRoutePath = appRoutes.wallet;

export const walletRoutes = {
  euroToken: parentRoutePath + "/deposit/neur",
  eth: parentRoutePath + "/deposit/eth",
};
