import { expect } from "chai";

import { calculateTimeLeftUnits } from "./utils";

describe("timeLeft utils", () => {
  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;

  it("calculates days hours minutes left 1", () => {
    const [days, hours, minutes] = calculateTimeLeftUnits(day * 5 + 32);

    expect(days).to.eq(5);
    expect(hours).to.eq(0);
    expect(minutes).to.eq(0);
  });
  it("calculates days hours minutes left 2", () => {
    const [days, hours, minutes] = calculateTimeLeftUnits(hour * 3 + minute * 3 + 21);

    expect(days).to.eq(0);
    expect(hours).to.eq(3);
    expect(minutes).to.eq(3);
  });

  it("calculates days hours minutes left 3", () => {
    const [days, hours, minutes] = calculateTimeLeftUnits(day * 5 + hour * 3 + minute * 3 + 21);

    expect(days).to.eq(5);
    expect(hours).to.eq(3);
    expect(minutes).to.eq(3);
  });
});
