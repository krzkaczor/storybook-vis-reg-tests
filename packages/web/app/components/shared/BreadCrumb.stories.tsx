import { storiesOf } from "@storybook/react";
import * as React from "react";

import { BreadCrumb } from "./BreadCrumb";

storiesOf("Basic UI/BreadCrumb", module)
  .add("with view", () => <BreadCrumb view="view name" />)
  .add("with view and single path", () => <BreadCrumb view="view name" path={["First path"]} />)
  .add("with view and multiple paths", () => (
    <BreadCrumb view="view name" path={["First path", "Second path"]} />
  ));
