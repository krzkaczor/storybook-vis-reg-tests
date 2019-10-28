import { storiesOf } from "@storybook/react";
import * as React from "react";

import { ENeonHeaderSize, NeonHeader } from "./NeonHeader";

storiesOf("NeonHeader", module)
  .add("default", () => <NeonHeader>Lorem ipsum dolor sit amet</NeonHeader>)
  .add("big size", () => (
    <NeonHeader size={ENeonHeaderSize.BIG}>Lorem ipsum dolor sit amet</NeonHeader>
  ));
