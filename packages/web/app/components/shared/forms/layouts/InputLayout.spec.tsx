import { expect } from "chai";
import { mount, shallow } from "enzyme";
import * as React from "react";
import { spy } from "sinon";

import { InputLayout } from "./InputLayout";

describe("FormFieldRaw TextInput", () => {
  it("should show value", () => {
    const component = shallow(
      <InputLayout
        name="foo"
        type="text"
        placeholder="test_placeholder"
        value="test_value"
        onChange={() => {}}
      />,
    );
    expect(
      component
        .render()
        .find("input")
        .val(),
    ).to.contain("test_value");
  });

  it("should show placeholder", () => {
    const component = shallow(
      <InputLayout name="foo" type="text" placeholder="test_placeholder" onChange={() => {}} />,
    );
    expect(
      component
        .render()
        .find("input")
        .attr("placeholder"),
    ).to.contain("test_placeholder");
  });

  it("should run onFocus", () => {
    const focusSpy = spy();

    const input = mount(
      <InputLayout name="foo" type="text" onFocus={focusSpy} onChange={() => {}} />,
    ).find("input");
    input.simulate("focus");

    expect(focusSpy).to.have.been.called;
  });

  it("should run onBlur", () => {
    const blurSpy = spy();
    const input = mount(
      <InputLayout name="foo" type="text" onBlur={blurSpy} onChange={() => {}} />,
    ).find("input");

    input.simulate("blur");

    expect(blurSpy).to.have.been.called;
  });
});
