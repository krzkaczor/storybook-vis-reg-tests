import { expect } from "chai";
import { shallow } from "enzyme";
import * as React from "react";

import { TabContent, Tabs } from "./Tabs";

describe("Tabs", () => {
  it("should render 3 tabs with first open", () => {
    const wrapper = shallow(
      <Tabs>
        <TabContent tab="Tab 1" data-test-id="tab-test1">
          Lorem ipsum dolor sit amet.
        </TabContent>
        <TabContent tab="Tab 2" data-test-id="tab-test2">
          Aperiam dicta eius sint suscipit!
        </TabContent>
        <TabContent tab="Tab 3" data-test-id="tab-test3">
          Est perspiciatis quidem unde voluptatum.
        </TabContent>
      </Tabs>,
    );

    // should find 3 divs with onClick
    expect(wrapper.find('div[data-test-id^="tab-test"]')).to.have.length(3);
    // active tab should have Tab 1 text set
    expect(wrapper.find(".is-active").text()).eq("Tab 1");
    // only one TabContent should be visible at time
    expect(wrapper.find(TabContent)).to.have.length(1);
    expect(
      wrapper
        .find(TabContent)
        .children()
        .text(),
    ).eq("Lorem ipsum dolor sit amet.");
  });

  it("should render 2 tabs with first valid open", () => {
    const wrapper = shallow(
      <Tabs>
        {undefined}
        {false}
        <TabContent tab="Tab 3" data-test-id="tab-test3">
          Lorem ipsum dolor sit amet.
        </TabContent>
        {undefined}
        {true}
        <TabContent tab="Tab 6" data-test-id="tab-test6">
          Aperiam dicta eius sint suscipit!
        </TabContent>
        {undefined}
        {/* null is not accepted by typings, but let's force it */}
        {null as any}
      </Tabs>,
    );

    // should find 2 divs with onClick
    expect(wrapper.find('div[data-test-id^="tab-test"]')).to.have.length(2);
    // active tab should have Tab 2 text set
    expect(wrapper.find(".is-active").text()).eq("Tab 3");
    // only one TabContent should be visible at time
    expect(wrapper.find(TabContent)).to.have.length(1);
    expect(
      wrapper
        .find(TabContent)
        .children()
        .text(),
    ).eq("Lorem ipsum dolor sit amet.");
  });
});
