import { storiesOf } from "@storybook/react";
import * as React from "react";

import { LockedWallet } from "./LockedWallet";

storiesOf("Locked Wallet", module)
  .add("Normal Wallet", () => (
    <LockedWallet
      data={{
        ethAmount: "0",
        ethEuroAmount: "0",
        neuroAmount: "0",
        neuroEuroAmount: "0",
        totalEuroAmount: "0",
      }}
    />
  ))
  .add("With Eth only", () => (
    <LockedWallet
      data={{
        ethAmount: "1",
        ethEuroAmount: "1",
        neuroAmount: "0",
        neuroEuroAmount: "0",
        totalEuroAmount: "0",
      }}
    />
  ))
  .add("With Euro only", () => (
    <LockedWallet
      data={{
        ethAmount: "0",
        ethEuroAmount: "0",
        neuroAmount: "1",
        neuroEuroAmount: "1",
        totalEuroAmount: "0",
      }}
    />
  ))
  .add("With Both Values", () => (
    <LockedWallet
      data={{
        ethAmount: "1",
        ethEuroAmount: "1",
        neuroAmount: "1",
        neuroEuroAmount: "1",
        totalEuroAmount: "0",
      }}
    />
  ));
