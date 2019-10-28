import { BrowserWalletErrorMessage } from "../../../components/translatedMessages/messages";
import { createMessage, TMessage } from "../../../components/translatedMessages/utils";
import {
  BrowserWalletAccountApprovalPendingError,
  BrowserWalletAccountApprovalRejectedError,
  BrowserWalletLockedError,
  BrowserWalletMismatchedNetworkError,
  BrowserWalletMissingError,
} from "../../../lib/web3/browser-wallet/BrowserWallet";

export function mapBrowserWalletErrorToErrorMessage(e: Error): TMessage {
  let messageType = BrowserWalletErrorMessage.GENERIC_ERROR;

  if (e instanceof BrowserWalletLockedError) {
    messageType = BrowserWalletErrorMessage.WALLET_IS_LOCKED;
  }
  if (e instanceof BrowserWalletMismatchedNetworkError) {
    messageType = BrowserWalletErrorMessage.WALLET_CONNECTED_TO_WRONG_NETWORK;
  }
  if (e instanceof BrowserWalletMissingError) {
    messageType = BrowserWalletErrorMessage.WALLET_NOT_ENABLED;
  }
  if (e instanceof BrowserWalletAccountApprovalRejectedError) {
    messageType = BrowserWalletErrorMessage.ACCOUNT_APPROVAL_REJECTED;
  }
  if (e instanceof BrowserWalletAccountApprovalPendingError) {
    messageType = BrowserWalletErrorMessage.ACCOUNT_APPROVAL_PENDING;
  }

  return createMessage(messageType);
}
