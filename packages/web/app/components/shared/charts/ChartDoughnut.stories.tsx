import { storiesOf } from "@storybook/react";
import * as React from "react";

import { ChartDoughnut } from "./ChartDoughnut.unsafe";

const data = {
  labels: ["ETH", "a quite lengthy nEUR label"],
  datasets: [
    {
      data: [100, 50],
      backgroundColor: ["#e3eaf5", "#394651"],
    },
  ],
};

storiesOf("Charts/Doughnut", module)
  .addDecorator(story => <div style={{ width: "25em" }}>{story()}</div>)
  .add("default", () => <ChartDoughnut data={data} />);
