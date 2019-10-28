import { expect } from "chai";
import { TestContext } from "yup";

import { isPledgeAboveMinimum, isPledgeNotAboveMaximum } from "./utils";

describe("isPledgeAboveMinimum", () => {
  it("should correctly validate", () => {
    const testOptionsMin = isPledgeAboveMinimum(50);
    const testFunction = testOptionsMin.test.bind({} as TestContext);

    expect(testFunction("10")).to.be.false;
    expect(testFunction("-20")).to.be.false;
    expect(testFunction("asdf")).to.be.false;
    expect(testFunction("12asdf")).to.be.false;
    expect(testFunction("x145")).to.be.false;

    expect(testFunction("51")).to.be.true;
    expect(testFunction("123")).to.be.true;
    expect(testFunction("1234567891011")).to.be.true;
  });
});

describe("isPledgeNotAboveMaximum", () => {
  it("should correctly validate", () => {
    const testOptionsMax = isPledgeNotAboveMaximum(500);
    const testFunction = testOptionsMax.test.bind({} as TestContext);

    expect(testFunction("10000")).to.be.false;
    expect(testFunction("asdf")).to.be.false;
    expect(testFunction("43263426342123")).to.be.false;
    expect(testFunction("x145")).to.be.false;

    expect(testFunction("120")).to.be.true;
    expect(testFunction("256")).to.be.true;
    expect(testFunction("500")).to.be.true;
  });
});
