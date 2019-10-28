import { expect } from "chai";
import { mount } from "enzyme";
import * as React from "react";

import { usePrevious } from "./usePrevious";

type TExternalProps = {
  value: string;
};

const TestComponent: React.FunctionComponent<TExternalProps> = ({ value }) => {
  const prevValue = usePrevious(value);

  return <>{String(prevValue)}</>;
};

describe("usePrevious", () => {
  it("should render previous prop value", async () => {
    const wrapper = mount(<TestComponent value="foo" />);

    expect(wrapper.text()).to.equal("undefined");

    // should still preserve previous value after update
    wrapper.update();
    expect(wrapper.text()).to.equal("undefined");

    // should update previous value after new one was received
    wrapper.setProps({ value: "bar" });
    expect(wrapper.text()).to.equal("foo");
  });
});
