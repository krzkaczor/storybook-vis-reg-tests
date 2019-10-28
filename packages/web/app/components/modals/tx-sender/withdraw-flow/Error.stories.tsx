import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import * as moment from "moment";
import * as React from "react";

import { ETransactionErrorType } from "../../../../modules/tx/sender/reducer";
import { withMockedDate, withModalBody } from "../../../../utils/storybookHelpers.unsafe";
import { WithdrawErrorLayout } from "./Error";

const dummyNow = new Date("10/3/2019");
const date = moment.utc(dummyNow).subtract(1, "day");

const props = {
  txHash: "0xdb3c43a0cfc4e221ecb52655eab3c3b88ba521a",
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
  error: ETransactionErrorType.LEDGER_CONTRACTS_DISABLED,
  isMined: false,
  onClick: action("Close Summary"),
};

storiesOf("Withdraw/Error", module)
  .addDecorator(withModalBody())
  .addDecorator(withMockedDate(dummyNow))
  .add("not mined", () => <WithdrawErrorLayout {...props} />)
  .add("mined", () => (
    <WithdrawErrorLayout {...props} isMined={true} txTimestamp={date.valueOf()} />
  ));
