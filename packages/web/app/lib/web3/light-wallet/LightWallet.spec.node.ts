import { expect } from "chai";

import { dummyEthereumAddress } from "../../../../test/fixtures";
import { createMock } from "../../../../test/testUtils";
import { IVault, LightWallet } from "../light-wallet/LightWallet";
import { Web3Adapter } from "../Web3Adapter";

describe("Light Wallet", () => {
  it("should generate correct metadata", () => {
    const web3AdapterMock = createMock<Web3Adapter>(Web3Adapter, {});
    const dummyEthAddress = dummyEthereumAddress;
    const dummyVault: IVault = { salt: "SOME SALT", walletInstance: "WALLET INSTANCE" };
    const dummyEmail = "test@example.com";

    const lightWallet = new LightWallet(web3AdapterMock, dummyEthAddress, dummyVault, dummyEmail);

    expect(lightWallet.getMetadata()).to.be.deep.eq({
      address: "0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359",
      email: "test@example.com",
      salt: "SOME SALT",
      walletType: "LIGHT",
      walletSubType: "UNKNOWN",
    });
  });
});
