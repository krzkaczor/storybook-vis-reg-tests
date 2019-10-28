import { expect } from "chai";
import { shallow } from "enzyme";
import * as React from "react";
import { spy } from "sinon";

import { tid } from "../../../../test/testUtils";
import { EtoProgressStepper } from "./EtoProgressStepper";

const mockData = [
  {
    name: "test",
    isDone: true,
  },
  {
    name: "Test",
    isDone: false,
  },
];

const spyFunction = spy();

describe("EtoProgressStepper", () => {
  it("Should show check when isDone is true", () => {
    const component1 = shallow(
      <EtoProgressStepper currentStep={1} stepProps={[mockData[0]]} onClick={spyFunction} />,
    );
    const component2 = shallow(
      <EtoProgressStepper currentStep={1} stepProps={[mockData[1]]} onClick={spyFunction} />,
    );

    expect(component1.find(tid("check-icon")).length).to.be.eq(1);
    expect(component2.find(tid("check-icon")).length).to.be.eq(0);
  });

  it("Should render name of step when isDone is false", () => {
    const component = shallow(
      <EtoProgressStepper currentStep={1} stepProps={[mockData[1]]} onClick={spyFunction} />,
    );

    expect(component.find(tid("EtoProgressStepper-header-text")).text()).to.contain(
      mockData[1].name,
    );
  });

  it("Should call callback function with index", () => {
    const component = shallow(
      <EtoProgressStepper currentStep={1} stepProps={[mockData[1]]} onClick={spyFunction} />,
    );
    component.find(tid("EtoProgressStepper-step-button")).simulate("click");
    expect(spyFunction).to.be.calledWith(0);
  });
});
