import { expect } from "chai";

import { doesStringOnlyContainIntegers } from "./utils";

describe("transaction-utils", () => {
  describe("doesStringOnlyContainIntegers", () => {
    it("should return false in these cases", () => {
      expect(doesStringOnlyContainIntegers("123.1")).to.be.false;
      expect(doesStringOnlyContainIntegers("1 2")).to.be.false;
      expect(doesStringOnlyContainIntegers("")).to.be.false;
      expect(doesStringOnlyContainIntegers(" ")).to.be.false;
      expect(doesStringOnlyContainIntegers("123123412341255,1")).to.be.false;
      expect(doesStringOnlyContainIntegers("123123412341255*1")).to.be.false;
      expect(doesStringOnlyContainIntegers("123123412341255a1")).to.be.false;
      expect(doesStringOnlyContainIntegers(12 as any)).to.be.false;
    });
    it("should return true in these cases", () => {
      expect(doesStringOnlyContainIntegers("123")).to.be.true;
      expect(doesStringOnlyContainIntegers("123123412341255")).to.be.true;
    });
  });
});
