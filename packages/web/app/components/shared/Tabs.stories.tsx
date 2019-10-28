import { storiesOf } from "@storybook/react";
import * as React from "react";

import { TabContent, Tabs } from "./Tabs";

const tabbedContent = [
  <TabContent tab="tab 1">
    <h5>content @ tab 1</h5>
    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis aliquid quae molestiae
      voluptatibus! Magni tenetur optio quos officia iusto repellat id praesentium saepe adipisci?
      Voluptates nisi inventore sequi fugit nostrum.
    </p>
  </TabContent>,
  <TabContent tab="tab 2">
    <h5>content @ tab 2</h5>
    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis aliquid quae molestiae
      voluptatibus! Magni tenetur optio quos officia iusto repellat id praesentium saepe adipisci?
      Voluptates nisi inventore sequi fugit nostrum.
    </p>
  </TabContent>,
  <TabContent tab="tab 3">
    <h5>content @ tab 3</h5>
    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis aliquid quae molestiae
      voluptatibus! Magni tenetur optio quos officia iusto repellat id praesentium saepe adipisci?
      Voluptates nisi inventore sequi fugit nostrum.
    </p>
  </TabContent>,
];

const withEmptyTabs = [
  false,
  undefined,
  <TabContent tab="tab 2">
    <h5>content @ tab 2</h5>
    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis aliquid quae molestiae
      voluptatibus! Magni tenetur optio quos officia iusto repellat id praesentium saepe adipisci?
      Voluptates nisi inventore sequi fugit nostrum.
    </p>
  </TabContent>,
];

storiesOf("Basic UI/NewTabs", module)
  .add("layout: small with ornament", () => <Tabs>{tabbedContent}</Tabs>)
  .add("layout: small", () => <Tabs layoutOrnament={false}>{tabbedContent}</Tabs>)
  .add("layout: large with ornament", () => <Tabs layoutSize="large">{tabbedContent}</Tabs>)
  .add("layout: large", () => (
    <Tabs layoutSize="large" layoutOrnament={false}>
      {tabbedContent}
    </Tabs>
  ))
  .add("layout: position right", () => <Tabs layoutPosition="right">{tabbedContent}</Tabs>)
  .add("layout: position center", () => <Tabs layoutPosition="center">{tabbedContent}</Tabs>)
  .add("tabs with first tab empty", () => <Tabs>{withEmptyTabs}</Tabs>);
