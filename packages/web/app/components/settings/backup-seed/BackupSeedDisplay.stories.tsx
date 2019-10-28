import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import * as React from "react";

import { BackupSeedDisplay } from "./BackupSeedDisplay";

const seed = [
  "argue",
  "resemble",
  "sustain",
  "tattoo",
  "know",
  "goat",
  "parade",
  "idea",
  "science",
  "okay",
  "loan",
  "float",
  "solution",
  "used",
  "order",
  "dune",
  "essay",
  "achieve",
  "illness",
  "keen",
  "guitar",
  "stumble",
  "idea",
  "strike",
];

storiesOf("BackupSeedDisplay", module).add("Backup seed display component", () => (
  <BackupSeedDisplay
    onNext={action("next")}
    onBack={action("back")}
    walletPrivateData={{ seed, privateKey: "123123421543253263432498787" }}
  />
));
