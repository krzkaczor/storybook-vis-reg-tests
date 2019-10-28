import { LightWalletErrorMessage } from "../../../components/translatedMessages/messages";
import { createMessage, TMessage } from "../../../components/translatedMessages/utils";
import {
  LightSignMessageError,
  LightWalletWrongPassword,
} from "../../../lib/web3/light-wallet/LightWallet";
import {
  LightCreationError,
  LightDeserializeError,
  LightKeyEncryptError,
  LightWalletWrongMnemonic,
  LightWrongPasswordSaltError,
} from "../../../lib/web3/light-wallet/LightWalletUtils";

export function mapLightWalletErrorToErrorMessage(e: Error): TMessage {
  let messageType = LightWalletErrorMessage.GENERIC_ERROR;

  if (e instanceof LightWrongPasswordSaltError) {
    messageType = LightWalletErrorMessage.WRONG_PASSWORD_SALT;
  }
  if (e instanceof LightSignMessageError) {
    messageType = LightWalletErrorMessage.SIGN_MESSAGE;
  }
  if (e instanceof LightCreationError) {
    messageType = LightWalletErrorMessage.CREATION_ERROR;
  }
  if (e instanceof LightDeserializeError) {
    messageType = LightWalletErrorMessage.DESERIALIZE;
  }
  if (e instanceof LightKeyEncryptError) {
    messageType = LightWalletErrorMessage.ENCRYPTION_ERROR;
  }
  if (e instanceof LightWalletWrongPassword) {
    messageType = LightWalletErrorMessage.WRONG_PASSWORD;
  }
  if (e instanceof LightWalletWrongMnemonic) {
    messageType = LightWalletErrorMessage.WRONG_MNEMONIC;
  }

  return createMessage(messageType);
}
