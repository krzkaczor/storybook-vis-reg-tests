import * as React from "react";
import { FormattedMessage } from "react-intl-phraseapp";

import { EFundingRound } from "../../lib/api/eto/EtoApi.interfaces.unsafe";
import { Dictionary, TTranslatedString } from "../../types";

export const FUNDING_ROUNDS: Dictionary<TTranslatedString, EFundingRound | "NONE_KEY"> = {
  NONE_KEY: <FormattedMessage id="form.select.please-select" />,
  [EFundingRound.PRE_SEED]: "Pre-Seed",
  [EFundingRound.SEED]: "Seed",
  [EFundingRound.A_ROUND]: "Series A",
  [EFundingRound.B_ROUND]: "Series B",
  [EFundingRound.C_ROUND]: "Series C",
  [EFundingRound.D_ROUND]: "Series D",
  [EFundingRound.E_ROUND]: "Series E",
  [EFundingRound.PRE_IPO]: "Pre-IPO",
  [EFundingRound.PUBLIC]: "PUBLIC",
};

export const DEFAULT_PLACEHOLDER = "N/A";
