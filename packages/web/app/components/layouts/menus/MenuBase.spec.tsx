import { expect } from "chai";
import { mount } from "enzyme";
import * as React from "react";

import { tid } from "../../../../test/testUtils";
import { MenuBase } from "./MenuBase";

describe("Dropdown menu", () => {
  it("should render closed button and be closed on initial rendering", () => {
    const component = mount(
      <MenuBase
        closedElement={<img src="" alt="menu" data-test-id="button-menu-closed" />}
        openElement={<img src="" alt="menu" data-test-id="button-menu-open" />}
        className={"teststyle"}
        renderMenu={<div data-test-id="menu-content" />}
      />,
    );

    expect(component.find(tid("menu-content"))).to.have.length(0);
    expect(component.find(tid("button-menu-closed"))).to.have.length(1);
    expect(component.find(tid("button-menu-open"))).to.have.length(0);
  });
  it("should render open button and the menu after click", () => {
    const component = mount(
      <MenuBase
        closedElement={<img src="" alt="menu" data-test-id="button-menu-closed" />}
        openElement={<img src="" alt="menu" data-test-id="button-menu-open" />}
        className={"teststyle"}
        renderMenu={<div data-test-id="menu-content" />}
      />,
    );

    component
      .find(tid("button-menu-closed"))
      .at(0)
      .simulate("click")
      .update();
    expect(component.find(tid("menu-content"))).to.have.length(1);
    expect(component.find(tid("button-menu-closed"))).to.have.length(0);
    expect(component.find(tid("button-menu-open"))).to.have.length(1);
  });

  it("should be closed after clicking on the button", () => {
    const component = mount(
      <MenuBase
        closedElement={<img src="" alt="menu" data-test-id="button-menu-closed" />}
        openElement={<img src="" alt="menu" data-test-id="button-menu-open" />}
        className={"teststyle"}
        renderMenu={<div data-test-id="menu-content" />}
      />,
    );

    component
      .find(tid("button-menu-closed"))
      .at(0)
      .simulate("click")
      .update();

    expect(component.find(tid("menu-content"))).to.have.length(1);
    expect(component.find(tid("button-menu-closed"))).to.have.length(0);
    expect(component.find(tid("button-menu-open"))).to.have.length(1);

    component
      .find(tid("button-menu-open"))
      .at(0)
      .simulate("click")
      .update();

    expect(component.find(tid("menu-content"))).to.have.length(0);
    expect(component.find(tid("button-menu-closed"))).to.have.length(1);
    expect(component.find(tid("button-menu-open"))).to.have.length(0);
  });
});
