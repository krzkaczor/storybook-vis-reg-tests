import { ITokenDisbursal } from "../../../../investor-portfolio/types";

export type TAcceptPayoutAdditionalData = {
  tokensDisbursals: ReadonlyArray<ITokenDisbursal>;
};
