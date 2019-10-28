import { storiesOf } from "@storybook/react";
import * as React from "react";

import { ChartPie } from "./ChartPie";

const data = {
  labels: ["Lorem", "Ipsum", "Dit", "Sit", "Amet", "Blah"],
  datasets: [
    {
      data: [100, 50, 20, 40, 50, 12],
      backgroundColor: ["#394651", "#c4c5c6", "#616611", "#9fa914", "#d5e20f", "#0b0e11"],
    },
  ],
};

storiesOf("Charts/Pie", module).add("default", () => <ChartPie data={data} />);
