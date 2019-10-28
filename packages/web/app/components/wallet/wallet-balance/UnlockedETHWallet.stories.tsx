import { storiesOf } from "@storybook/react";
import * as React from "react";

import { UnlockedETHWallet } from "./UnlockedETHWallet";

storiesOf("Unlocked ETH Wallet", module)
  .add("empty", () => (
    <UnlockedETHWallet
      depositEth={() => {}}
      withdrawEth={() => {}}
      address="0x"
      ethAmount={"0"}
      ethEuroAmount={"0"}
      totalEuroAmount={"0"}
    />
  ))
  .add("not empty", () => (
    <UnlockedETHWallet
      depositEth={() => {}}
      withdrawEth={() => {}}
      address="0x"
      ethAmount={"1"}
      ethEuroAmount={"1"}
      totalEuroAmount={"1"}
    />
  ));
