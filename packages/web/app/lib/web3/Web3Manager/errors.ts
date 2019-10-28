import { SignerErrorMessage } from "../../../components/translatedMessages/messages";
import { createMessage, TMessage } from "../../../components/translatedMessages/utils";
import { SignerRejectConfirmationError, SignerTimeoutError } from "./Web3Manager";

export function mapSignerErrorToErrorMessage(e: Error): TMessage {
  let messageType = SignerErrorMessage.GENERIC_ERROR;

  if (e instanceof SignerRejectConfirmationError) {
    messageType = SignerErrorMessage.CONFIRMATION_REJECTED;
  }

  if (e instanceof SignerTimeoutError) {
    messageType = SignerErrorMessage.TIMEOUT;
  }

  return createMessage(messageType);
}
