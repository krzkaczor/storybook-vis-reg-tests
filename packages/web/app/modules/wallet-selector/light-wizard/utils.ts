import {
  encryptString,
  getWalletKeyFromSaltAndPassword,
} from "../../../lib/web3/light-wallet/LightWalletUtils";
import { GENERATED_KEY_SIZE, VAULT_MSG } from "./constants";

export async function getVaultKey(salt: string, password: string): Promise<string> {
  const walletKey = await getWalletKeyFromSaltAndPassword(password, salt, GENERATED_KEY_SIZE);
  return encryptString({
    string: VAULT_MSG,
    pwDerivedKey: walletKey,
  });
}
