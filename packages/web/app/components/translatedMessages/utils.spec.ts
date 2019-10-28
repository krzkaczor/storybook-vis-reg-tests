import { expect } from "chai";

import { createMessage, formatMatchingFieldNames } from "./utils";

enum TestMessageType {
  TEST_MESSAGE = "testMessage",
}

describe("translation utils/createMessage", () => {
  it("creates a TMessage object", () => {
    const msgType = TestMessageType.TEST_MESSAGE;
    const msgPayload = { a: 1, b: "blabla", c: [1, 2, 3] };
    const expectedOutput = {
      messageType: msgType,
      messageData: msgPayload,
    };
    //@ts-ignore because createMessage only accepts TranslatedMessageType from ./messages
    expect(createMessage(msgType, msgPayload)).to.be.deep.equal(expectedOutput);
  });
});

describe("formatMatchingFieldNames", () => {
  it("converts an array of field names into a string", () => {
    const input = ["fieldOne", "fieldTwo", "fieldThree"];
    expect(formatMatchingFieldNames(input)).to.eq('"fieldOne", "fieldTwo" and "fieldThree"');
  });
  it("correctly handles two field names", () => {
    const input = ["fieldOne", "fieldTwo"];
    expect(formatMatchingFieldNames(input)).to.eq('"fieldOne" and "fieldTwo"');
  });
  it("throws if field names array has less than 2 fields", () => {
    const input1: string[] = [];
    const input2: string[] = ["fieldOne"];
    expect(() => formatMatchingFieldNames(input1)).to.throw;
    expect(() => formatMatchingFieldNames(input2)).to.throw;
  });
});
