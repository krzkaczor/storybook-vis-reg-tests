import { EEtoFormTypes } from "../../../modules/eto-flow/types";
import { Dictionary } from "../../../types";
import { EEtoState, EFundingRound } from "./EtoApi.interfaces.unsafe";

export const etoFormIsReadonly = (formName: EEtoFormTypes, etoState?: EEtoState) => {
  const readOnlyForms = [
    EEtoFormTypes.EtoEquityTokenInfo,
    EEtoFormTypes.EtoTerms,
    EEtoFormTypes.EtoVotingRights,
    EEtoFormTypes.EtoInvestmentTerms,
  ];
  return etoState !== EEtoState.PREVIEW && readOnlyForms.includes(formName);
};

export const NEXT_FUNDING_ROUNDS: Dictionary<EFundingRound | undefined, EFundingRound> = {
  [EFundingRound.PRE_SEED]: EFundingRound.SEED,
  [EFundingRound.SEED]: EFundingRound.A_ROUND,
  [EFundingRound.A_ROUND]: EFundingRound.B_ROUND,
  [EFundingRound.B_ROUND]: EFundingRound.C_ROUND,
  [EFundingRound.C_ROUND]: EFundingRound.D_ROUND,
  [EFundingRound.D_ROUND]: EFundingRound.E_ROUND,
  [EFundingRound.E_ROUND]: EFundingRound.PRE_IPO,
  [EFundingRound.PRE_IPO]: EFundingRound.PUBLIC,
  [EFundingRound.PUBLIC]: undefined,
};
