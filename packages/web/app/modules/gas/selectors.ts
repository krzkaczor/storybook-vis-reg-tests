import { GasModelShape } from "../../lib/api/gas/GasApi";
import { IAppState } from "../../store";
import { calculateGasPriceWithOverhead } from "../tx/utils";

export const selectIsGasPriceAlreadyLoaded = (state: IAppState): boolean =>
  !state.gas.loading && !!state.gas.gasPrice;

export const selectGasPrice = (state: IAppState): GasModelShape | undefined => state.gas.gasPrice;

export const selectStandardGasPrice = (state: IAppState): string =>
  (state.gas.gasPrice && state.gas.gasPrice.standard) || "0";

export const selectStandardGasPriceWithOverHead = (state: IAppState): string =>
  (state.gas.gasPrice && calculateGasPriceWithOverhead(state.gas.gasPrice.standard)) || "0";
