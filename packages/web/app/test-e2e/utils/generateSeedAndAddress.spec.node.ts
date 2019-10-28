import { expect } from "chai";

import { generateSeedAndAddress } from "./generateSeedAndAddress";
import { DEFAULT_HD_PATH } from "./userHelpers";

describe("generateSeedAndAddress", () => {
  it("generates seed and password", async () => {
    const { seed, address } = await generateSeedAndAddress(DEFAULT_HD_PATH);

    expect(seed.length).to.eq(24);
    expect(address.length).to.eq(42);
  });
});
