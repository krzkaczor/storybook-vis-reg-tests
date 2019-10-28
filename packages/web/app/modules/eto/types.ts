import { TCompanyEtoData, TEtoSpecsData } from "../../lib/api/eto/EtoApi.interfaces.unsafe";
import { DeepReadonly, Dictionary, Overwrite } from "../../types";
import { EAgreementType } from "../tx/transactions/nominee/sign-agreement/types";

export interface IEtoTotalInvestment {
  totalEquivEurUlps: string;
  totalTokensInt: string;
  totalInvestors: string;
  euroTokenBalance: string;
  etherTokenBalance: string;
}

// Order is important. Next state is calculated by adding 1 to current state.
export enum EETOStateOnChain {
  Setup = 0, // Initial state
  Whitelist = 1,
  Public = 2,
  Signing = 3,
  Claim = 4,
  Payout = 5, // Terminal state
  Refund = 6, // Terminal state
}

export type TEtoStartOfStates = Record<EETOStateOnChain, Date | undefined>;

export interface IEtoContractData {
  timedState: EETOStateOnChain;
  totalInvestment: IEtoTotalInvestment;
  startOfStates: TEtoStartOfStates;
  equityTokenAddress: string;
  etoTermsAddress: string;
}

export type TEtoWithCompanyAndContract = DeepReadonly<
  TEtoSpecsData & {
    // contract is undefined when ETO is not on blockchain
    contract?: IEtoContractData;
    company: TCompanyEtoData;
    subState: EEtoSubState | undefined;
  }
>;

export type TEtoWithCompanyAndContractTypeChecked = Overwrite<
  TEtoWithCompanyAndContract,
  { contract: Exclude<TEtoWithCompanyAndContract["contract"], undefined> }
>;

export interface IEtoTokenData {
  balance: string;
  tokensPerShare: string;
  totalCompanyShares: string;
  companyValuationEurUlps: string;
  tokenPrice: string;
}

export interface IEtoTokenGeneralDiscounts {
  whitelistDiscountFrac: number;
  whitelistDiscountUlps: string;
  publicDiscountFrac: number;
  publicDiscountUlps: string;
}

export enum EEtoSubState {
  MARKETING_LISTING_IN_REVIEW = "marketing_listing_in_review",
  WHITELISTING = "whitelisting",
  CAMPAIGNING = "campaigning",
  COUNTDOWN_TO_PRESALE = "countdown_to_presale",
  COUNTDOWN_TO_PUBLIC_SALE = "countdown_to_public_sale",
}

export enum EEtoAgreementStatus {
  NOT_DONE = "not_done",
  DONE = "done",
  ERROR = "error",
}

export type TOfferingAgreementsStatus = Dictionary<EEtoAgreementStatus, EAgreementType>;

export type SignedISHAStatus = {
  isLoading: boolean;
  url: string | undefined;
};
