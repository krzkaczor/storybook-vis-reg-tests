import { storiesOf } from "@storybook/react";
import * as React from "react";

import { HorizontalLine } from "./HorizontalLine";

storiesOf("HorizontalLine", module)
  .add("wide (default)", () => <HorizontalLine />)
  .add("narrow", () => <HorizontalLine size="narrow" />)
  .add("yellow wide", () => <HorizontalLine theme="yellow" />)
  .add("yellow narrow", () => <HorizontalLine theme="yellow" size="narrow" />);
