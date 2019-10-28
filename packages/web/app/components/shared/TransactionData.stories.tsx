import { storiesOf } from "@storybook/react";
import * as React from "react";

import { ESize, ETheme, TransactionData } from "./TransactionData";

storiesOf("Atoms|TransactionData", module)
  .add("default", () => <TransactionData bottom="Claim Tx Transaction" top="today" />)
  .add("size medium", () => (
    <TransactionData bottom="Claim Tx Transaction" top="today" size={ESize.MEDIUM} />
  ))
  .add("size large", () => (
    <TransactionData bottom="Claim Tx Transaction" top="today" size={ESize.LARGE} />
  ))
  .add("size huge", () => (
    <TransactionData bottom="Claim Tx Transaction" top="today" size={ESize.HUGE} />
  ))
  .add("theme silver", () => (
    <TransactionData bottom="Claim Tx Transaction" top="today" theme={ETheme.SILVER} />
  ))
  .add("theme black", () => (
    <TransactionData bottom="Claim Tx Transaction" top="today" theme={ETheme.BLACK} />
  ));
