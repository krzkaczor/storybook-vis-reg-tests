import { expect } from "chai";
import { shallow } from "enzyme";
import * as React from "react";

import { tid } from "../../../test/testUtils";
import { PercentageIndicatorBar } from "./PercentageIndicatorBar";

describe("<PercentageIndicatorBar />", () => {
  it("should round percent value", () => {
    const component = shallow(<PercentageIndicatorBar percent={23.4} />);

    expect(component.find(tid("percentage-indicator-bar-value")).text()).to.be.eq("23%");
  });
});
