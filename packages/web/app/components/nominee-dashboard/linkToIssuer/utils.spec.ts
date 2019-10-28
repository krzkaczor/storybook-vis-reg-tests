import { expect } from "chai";

import { EMaskedFormError } from "../../translatedMessages/messages";
import { validateEthInput } from "./utils";

describe("validateEthInput", () => {
  it("return no error if value is undefined", () => {
    expect(validateEthInput(undefined)).to.eq(undefined);
  });
  it("throws on invalid input", () => {
    expect(() => validateEthInput(null as any)).to.throw;
    expect(() => validateEthInput(123 as any)).to.throw;
    expect(() => validateEthInput({} as any)).to.throw;
  });
  it("validates prefix", () => {
    expect(validateEthInput("0x")).to.eq(undefined);

    expect(validateEthInput("`")).to.eq(EMaskedFormError.INVALID_PREFIX);
    expect(validateEthInput("0z")).to.eq(EMaskedFormError.INVALID_PREFIX);
  });
  it("validates chars after prefix", () => {
    expect(validateEthInput("0xABCDEF1234abcdef")).to.eq(undefined);
    expect(validateEthInput("0xg")).to.eq(EMaskedFormError.ILLEGAL_CHARACTER);
    expect(validateEthInput("0xABCD1234p")).to.eq(EMaskedFormError.ILLEGAL_CHARACTER);
  });
  it("returns an error if length after prefix is more than 40", () => {
    expect(validateEthInput("0x0510fba1dcf0c6debf53edf66a7b314950c1da6a")).to.eq(undefined);
    expect(validateEthInput("0x0510fba1dcf0c6debf53edf66a7b314950c1da6a5")).to.eq(
      EMaskedFormError.MAX_LENGTH_EXCEEDED,
    );
  });
  it("on multiple errors the priority is prefix -> illegal character -> length exceeded", () => {
    expect(validateEthInput("3x0510fba1dcf0c6debf`53edf66a7b314950c1da6a")).to.eq(
      EMaskedFormError.INVALID_PREFIX,
    );
    expect(validateEthInput("0x0510fba1dcf0c6debf`53edf66a7b314950c1da6a")).to.eq(
      EMaskedFormError.ILLEGAL_CHARACTER,
    );
  });
});
