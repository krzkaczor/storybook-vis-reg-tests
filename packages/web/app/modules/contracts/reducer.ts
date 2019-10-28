import { BigNumber } from "bignumber.js";

import { AppReducer } from "../../store";
import { DeepReadonly } from "../../types";
import { actions } from "../actions";

/**
 * Constants from Platform Terms.
 * Mind the units. Durations are in seconds.
 */
export interface IPlatformTermsConstants {
  IS_ICBM_INVESTOR_WHITELISTED: boolean;
  PLATFORM_NEUMARK_SHARE: BigNumber;
  TOKEN_PARTICIPATION_FEE_FRACTION: BigNumber;
  PLATFORM_FEE_FRACTION: BigNumber;
  TOKEN_RATE_EXPIRES_AFTER: BigNumber;
}

interface IContractState {
  platformTermsConstants: IPlatformTermsConstants;
}

const contractsInitialState: IContractState = {
  platformTermsConstants: {} as any,
  // initially empty. But contract should be initialized first on application start,
  // and values are set throughout the app lifetime
};

export const contractsReducer: AppReducer<IContractState> = (
  state = contractsInitialState,
  action,
): DeepReadonly<IContractState> => {
  switch (action.type) {
    case actions.contracts.setPlatformTermConstants.getType():
      return {
        ...state,
        ...action.payload,
      };
  }
  return state;
};
