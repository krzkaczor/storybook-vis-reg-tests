import { storiesOf } from "@storybook/react";
import * as React from "react";

import { PercentageIndicatorBar } from "./PercentageIndicatorBar";

storiesOf("PercentageIndicator (Progress)", module)
  .add("progress: 100%", () => <PercentageIndicatorBar percent={100} />)
  .add("progress: 77%", () => <PercentageIndicatorBar percent={77} />)
  .add("progress: 5%", () => <PercentageIndicatorBar percent={5} />)
  .add("progress: 1%", () => <PercentageIndicatorBar percent={1} />)
  .add("progress: 0%", () => <PercentageIndicatorBar percent={0} />)
  .add("theme: green, progress: 1%", () => <PercentageIndicatorBar theme="green" percent={1} />)
  .add("theme: green, progress: 50%", () => <PercentageIndicatorBar theme="green" percent={50} />)
  .add("layout: narrow", () => <PercentageIndicatorBar layout="narrow" percent={50} />);
