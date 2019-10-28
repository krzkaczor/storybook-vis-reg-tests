import * as Yup from "yup";

import { ETransactionErrorType, ETxSenderState } from "../../../modules/tx/sender/reducer";
import { ETxSenderType } from "../../../modules/tx/types";
import { EWalletSubType, EWalletType } from "../../../modules/web3/types";
import { EthereumAddressWithChecksum } from "../../../utils/opaque-types/types";
import * as YupTS from "../../yup-ts.unsafe";

export const OOO_TRANSACTION_TYPE = "mempool";

export enum EUserType {
  INVESTOR = "investor",
  ISSUER = "issuer",
  NOMINEE = "nominee",
}

export interface IUser {
  userId: EthereumAddressWithChecksum;
  backupCodesVerified?: boolean;
  latestAcceptedTosIpfs?: string;
  language?: string;
  unverifiedEmail?: string;
  verifiedEmail?: string;
  type: EUserType;
  walletType: EWalletType;
  walletSubtype: EWalletSubType;
}

export interface IEmailStatus {
  isAvailable: boolean;
}

export interface IUserInput {
  newEmail?: string;
  salt?: string;
  language?: string;
  backupCodesVerified?: boolean;
  type: EUserType;
  walletType: EWalletType;
  walletSubtype: EWalletSubType;
}

export interface IVerifyEmailUser {
  verificationCode: string;
}

export const UserValidator = Yup.object()
  .shape({
    userId: Yup.string().required(),
    backupCodesVerified: Yup.boolean(),
    latestAcceptedTosIpfs: Yup.string(),
    language: Yup.string(),
    unverifiedEmail: Yup.string(),
    verifiedEmail: Yup.string(),
    type: Yup.string().oneOf(["investor", "issuer", "nominee"]),
    walletType: Yup.string().oneOf(Object.keys(EWalletType).map(type => type.toLowerCase())),
    walletSubtype: Yup.string().oneOf(Object.keys(EWalletSubType).map(type => type.toLowerCase())),
  })
  .required();

export const emailStatus = Yup.object().shape({
  isAvailable: Yup.boolean(),
});

export const TxSchema = YupTS.object({
  blockHash: YupTS.string().optional(),
  blockNumber: YupTS.string().optional(),
  chainId: YupTS.string().optional(),
  from: YupTS.string(),
  gas: YupTS.string(),
  gasPrice: YupTS.string(),
  hash: YupTS.string(),
  input: YupTS.string(),
  nonce: YupTS.string(),
  status: YupTS.string().optional(),
  to: YupTS.string(),
  transactionIndex: YupTS.string().optional(),
  value: YupTS.string(),
});

export const TxWithMetadataSchema = YupTS.object({
  transaction: TxSchema,
  transactionType: YupTS.string<typeof OOO_TRANSACTION_TYPE>(),
});

export const TxPendingWithMetadataSchema = YupTS.object({
  transaction: TxSchema,
  transactionType: YupTS.string<ETxSenderType>(),
  transactionTimestamp: YupTS.number(),
  transactionStatus: YupTS.string<ETxSenderState>(),
  transactionError: YupTS.string<ETransactionErrorType>().optional(),
});

export const PendingTxsSchema = YupTS.object({
  // it's a pending transaction issued by us
  pendingTransaction: TxPendingWithMetadataSchema.optional(),
  // list of other pending transaction (out of bounds transactions) issued externally
  oooTransactions: YupTS.array(TxWithMetadataSchema),
});

export type Tx = YupTS.TypeOf<typeof TxSchema>;
export type TxWithMetadata = YupTS.TypeOf<typeof TxWithMetadataSchema>;
export type TxPendingWithMetadata = YupTS.TypeOf<typeof TxPendingWithMetadataSchema> & {
  transactionAdditionalData?: any;
};
export type TPendingTxs = YupTS.TypeOf<typeof PendingTxsSchema>;
