import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import * as moment from "moment";
import * as React from "react";

import { ITokenDisbursal } from "../../../../modules/investor-portfolio/types";
import { withMockedDate, withModalBody } from "../../../../utils/storybookHelpers.unsafe";
import { ECurrency } from "../../../shared/formatters/utils";
import { InvestorRedistributePayoutSuccessLayout } from "./RedistributeSuccess";

const ethTokenDisbursal: ITokenDisbursal = {
  token: ECurrency.ETH,
  amountToBeClaimed: "6.582870355588135389497e+21",
  totalDisbursedAmount: "9.7154607e+22",
  timeToFirstDisbursalRecycle: 1675401473000,
};

const dummyNow = new Date("10/3/2019");
const date = moment.utc(dummyNow).subtract(1, "day");

const props = {
  txTimestamp: date.valueOf(),
  additionalData: { tokenDisbursals: ethTokenDisbursal },
  goToPortfolio: action("View Portfolio"),
};

storiesOf("InvestorPayout/RedistributeSuccess", module)
  .addDecorator(withModalBody())
  .addDecorator(withMockedDate(dummyNow))
  .add("default", () => <InvestorRedistributePayoutSuccessLayout {...props} />);
