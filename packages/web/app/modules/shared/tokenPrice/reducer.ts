import { AppReducer } from "../../../store";

export interface ITokenPriceState {
  loading: boolean;
  error?: string;
  tokenPriceData?: ITokenPriceStateData;
}

// balances of all coins are represented by bignumber.js strings
export interface ITokenPriceStateData {
  etherPriceEur: string;
  neuPriceEur: string;
  eurPriceEther: string;
  priceOutdated: boolean;
}

const walletInitialState: ITokenPriceState = {
  loading: true,
};

export const tokenPriceReducer: AppReducer<ITokenPriceState> = (
  state = walletInitialState,
  action,
): ITokenPriceState => {
  switch (action.type) {
    case "TOKEN_PRICE_LOAD_START":
      return {
        ...state,
        loading: true,
      };
    case "TOKEN_PRICE_SAVE":
      return {
        ...state,
        loading: false,
        tokenPriceData: action.payload,
      };
  }

  return state;
};
