import { expect } from "chai";

import { createActionFactory } from "./actionsUtils";

describe("createActionFactory", () => {
  it("should create action without payload", () => {
    expect(createActionFactory("CREATE_USER")()).to.be.eql({
      type: "CREATE_USER",
    });
  });

  it("should create action with payload", () => {
    expect(createActionFactory("UPDATE_USER", (id: number) => ({ id }))(69)).to.be.eql({
      type: "UPDATE_USER",
      payload: { id: 69 },
    });
  });

  it("should overwrite `toString` and implement `getType` to return action type", () => {
    const actionCreator = createActionFactory("CREATE_USER");

    expect(actionCreator.toString()).to.be.eq("CREATE_USER");
    expect(actionCreator.getType()).to.be.eq("CREATE_USER");
  });
});
