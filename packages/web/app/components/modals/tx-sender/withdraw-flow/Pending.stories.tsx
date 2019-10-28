import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import * as moment from "moment";
import * as React from "react";

import { withMockedDate, withModalBody } from "../../../../utils/storybookHelpers.unsafe";
import { WithdrawPendingComponent } from "./Pending";

const dummyNow = new Date("10/3/2019");
const date = moment.utc(dummyNow).subtract(1, "day");

const props = {
  txHash: "0xdb3c43a0cfc4e221ecb52655eab3c3b88ba521a",
  blockId: 1234,
  txTimestamp: date.valueOf(),
  additionalData: {
    to: "0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359",
    amount: "5500000000000000000",
    amountEur: "5500000000000000000",
    total: "313131232312331212",
    totalEur: "313131232312331212",
  },
  walletAddress: "0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359",
  gasCost: "023",
  gasCostEur: "123",
  onClick: action("Close Summary"),
};

storiesOf("Withdraw/Pending", module)
  .addDecorator(withModalBody())
  .addDecorator(withMockedDate(dummyNow))
  .add("default", () => <WithdrawPendingComponent {...props} />);
