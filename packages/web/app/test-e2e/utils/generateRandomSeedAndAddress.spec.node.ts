import { expect } from "chai";

import { isAddressValid } from "../../modules/web3/utils";
import { generateRandomSeedAndAddress } from "./generateRandomSeedAndAddress";
import { DEFAULT_HD_PATH } from "./userHelpers";

describe("generateRandomSeedAndAddress", () => {
  it("generates seed and password", async () => {
    const { seed, address } = await generateRandomSeedAndAddress(DEFAULT_HD_PATH);

    expect(seed.length).to.eq(24);
    expect(isAddressValid(address)).to.be.true;
  });
});
