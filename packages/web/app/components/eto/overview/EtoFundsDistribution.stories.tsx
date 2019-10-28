import { storiesOf } from "@storybook/react";
import * as React from "react";

import { EtoFundsDistribution } from "./EtoFundsDistribution";

const chartBarData = {
  labels: ["Lorem", "Ipsum", "Dit", "Sit", "Amet", "Blah", "Lorem", "Ipsum"],
  datasets: [
    {
      data: [130, 50, 20, 40, 50, 12, 100, 87],
      backgroundColor: [
        "#394651",
        "#394651",
        "#394651",
        "#394651",
        "#394651",
        "#394651",
        "#394651",
        "#394651",
      ],
    },
  ],
};

storiesOf("EtoFundsDistribution", module).add("default", () => (
  <EtoFundsDistribution
    investors={[
      {
        name: "Name",
        invested: "1234567" + "0".repeat(16),
        value: 12344455,
        tokens: 4,
      },
      {
        name: "Name",
        invested: "1234567" + "0".repeat(16),
        value: 12344455,
        tokens: 4,
      },
    ]}
    numberOfInvestors={2}
    numberOfTransactions={12}
    chartDataNTotalAmountInvested={chartBarData}
    chartDataNumberOfInvestors={chartBarData}
  />
));
