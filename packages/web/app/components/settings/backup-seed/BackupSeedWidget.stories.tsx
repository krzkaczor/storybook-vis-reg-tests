import { storiesOf } from "@storybook/react";
import * as React from "react";

import { BackupSeedWidgetBase } from "./BackupSeedWidget";

storiesOf("BackupSeedWidget", module)
  .add("verified backup codes", () => <BackupSeedWidgetBase step={1} backupCodesVerified />)
  .add("unverified backup codes", () => (
    <BackupSeedWidgetBase step={1} backupCodesVerified={false} />
  ));
