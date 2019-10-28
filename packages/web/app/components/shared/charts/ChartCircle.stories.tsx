import { storiesOf } from "@storybook/react";
import * as React from "react";

import { ChartCircle } from "./ChartCircle";

storiesOf("Charts/Circle", module)
  .add("0%", () => <ChartCircle name="Key People" progress={0} />)
  .add("20%", () => <ChartCircle name="Key People" progress={0.2} />)
  .add("50%", () => <ChartCircle name="Key People" progress={0.5} />)
  .add("70%", () => <ChartCircle name="Key People" progress={0.7} />)
  .add("70.723434543%", () => <ChartCircle name="Key People" progress={0.703434543} />)
  .add("100%", () => <ChartCircle name="Key People" progress={1} />);
