import { storiesOf } from "@storybook/react";
import * as React from "react";

import { IcbmWallet } from "./IcbmWallet";

storiesOf("ICBM Wallet", module)
  .add("Normal Wallet", () => (
    <IcbmWallet
      onUpgradeEtherClick={() => {}}
      onUpgradeEuroClick={() => {}}
      data={{
        hasFunds: true,
        isEtherUpgradeTargetSet: true,
        isEuroUpgradeTargetSet: true,
        ethAmount: "0",
        ethEuroAmount: "0",
        neuroAmount: "0",
        neuroEuroAmount: "0",
        totalEuroAmount: "0",
      }}
    />
  ))
  .add("With Eth only", () => (
    <IcbmWallet
      onUpgradeEtherClick={() => {}}
      onUpgradeEuroClick={() => {}}
      data={{
        hasFunds: true,
        isEtherUpgradeTargetSet: true,
        isEuroUpgradeTargetSet: true,
        ethAmount: "1",
        ethEuroAmount: "1",
        neuroAmount: "0",
        neuroEuroAmount: "0",
        totalEuroAmount: "0",
      }}
    />
  ))
  .add("With Euro only", () => (
    <IcbmWallet
      onUpgradeEtherClick={() => {}}
      onUpgradeEuroClick={() => {}}
      data={{
        hasFunds: true,
        isEtherUpgradeTargetSet: true,
        isEuroUpgradeTargetSet: true,
        ethAmount: "0",
        ethEuroAmount: "0",
        neuroAmount: "1",
        neuroEuroAmount: "1",
        totalEuroAmount: "0",
      }}
    />
  ))
  .add("With Both Values", () => (
    <IcbmWallet
      onUpgradeEtherClick={() => {}}
      onUpgradeEuroClick={() => {}}
      data={{
        hasFunds: true,
        isEtherUpgradeTargetSet: true,
        isEuroUpgradeTargetSet: true,
        ethAmount: "1",
        ethEuroAmount: "1",
        neuroAmount: "1",
        neuroEuroAmount: "1",
        totalEuroAmount: "0",
      }}
    />
  ))
  .add("With Both Values and Callbacks but target not set", () => (
    <IcbmWallet
      onUpgradeEtherClick={() => {}}
      onUpgradeEuroClick={() => {}}
      data={{
        hasFunds: true,
        isEtherUpgradeTargetSet: false,
        isEuroUpgradeTargetSet: false,
        ethAmount: "1",
        ethEuroAmount: "1",
        neuroAmount: "1",
        neuroEuroAmount: "1",
        totalEuroAmount: "0",
      }}
    />
  ));
