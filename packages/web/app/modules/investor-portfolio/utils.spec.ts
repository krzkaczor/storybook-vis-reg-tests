import { expect } from "chai";

import { snapshotIsActual } from "./utils";

describe("snapshotIsActual", () => {
  it("it returns true if year, month and day are the same, ignoring the time", () => {
    const snapshotDate = 1559539973;
    const now = new Date(1559557973 * 1000);
    expect(snapshotIsActual(snapshotDate, now)).to.be.true;
  });

  it("it returns false if year, month and day are not the same", () => {
    const snapshotDate = 1559539973;
    const now = new Date(1567488773 * 1000);
    expect(snapshotIsActual(snapshotDate, now)).to.be.false;
  });
});
