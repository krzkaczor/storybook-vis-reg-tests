import { expect } from "chai";

import { EAccountSetupStepState } from "./types";
import { prepareSetupAccountSteps } from "./utils";

describe("prepareSetupAccountSteps", () => {
  it("iterates over data and sets the first not done element open", () => {
    const data = [
      {
        key: "a",
        conditionCompleted: true,
        title: "title 1",
        component: "component 1",
      },
      {
        key: "b",
        conditionCompleted: false,
        title: "title 2",
        component: "component 2",
      },
      {
        key: "c",
        conditionCompleted: false,
        title: "title 3",
        component: "component 3",
      },
    ];

    const expectedData = [
      {
        key: "a",
        number: 1,
        title: "title 1",
        stepState: EAccountSetupStepState.DONE,
        component: "component 1",
        isLast: false,
      },
      {
        key: "b",
        number: 2,
        title: "title 2",
        stepState: EAccountSetupStepState.ACTIVE,
        component: "component 2",
        isLast: false,
      },
      {
        key: "c",
        number: 3,
        title: "title 3",
        stepState: EAccountSetupStepState.NOT_DONE,
        component: "component 3",
        isLast: true,
      },
    ];

    expect(prepareSetupAccountSteps(data)).to.deep.eq(expectedData);
  });
});
