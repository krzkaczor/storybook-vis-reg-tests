import { LedgerContractsDisabledError } from "../../../lib/web3/ledger-wallet/errors";
import {
  InvalidChangeIdError,
  InvalidRlpDataError,
  LongTransactionQueError,
  LowNonceError,
  NotEnoughEtherForGasError,
  OutOfGasError,
  UnknownEthNodeError,
} from "../../../lib/web3/Web3Adapter";
import { SignerRejectConfirmationError } from "../../../lib/web3/Web3Manager/Web3Manager";
import { UserCannotUnlockFunds } from "../transactions/unlock/errors";
import { ETransactionErrorType } from "./reducer";

export function getTxSenderErrorType(error: Error): ETransactionErrorType {
  if (error instanceof OutOfGasError) {
    return ETransactionErrorType.GAS_TOO_LOW;
  } else if (error instanceof LowNonceError) {
    return ETransactionErrorType.NONCE_TOO_LOW;
  } else if (error instanceof LongTransactionQueError) {
    return ETransactionErrorType.TOO_MANY_TX_IN_QUEUE;
  } else if (error instanceof InvalidRlpDataError) {
    return ETransactionErrorType.INVALID_RLP_TX;
  } else if (error instanceof InvalidChangeIdError) {
    return ETransactionErrorType.INVALID_CHAIN_ID;
  } else if (error instanceof NotEnoughEtherForGasError) {
    return ETransactionErrorType.NOT_ENOUGH_ETHER_FOR_GAS;
  } else if (error instanceof UnknownEthNodeError) {
    return ETransactionErrorType.UNKNOWN_ERROR;
  } else if (error instanceof SignerRejectConfirmationError) {
    return ETransactionErrorType.TX_WAS_REJECTED;
  } else if (error instanceof LedgerContractsDisabledError) {
    return ETransactionErrorType.LEDGER_CONTRACTS_DISABLED;
  } else if (error instanceof UserCannotUnlockFunds) {
    return ETransactionErrorType.NOT_ENOUGH_NEUMARKS_TO_UNLOCK;
  } else {
    return ETransactionErrorType.UNKNOWN_ERROR;
  }
}
