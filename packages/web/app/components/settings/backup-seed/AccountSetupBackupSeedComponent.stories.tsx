import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import * as React from "react";

import { AccountSetupBackupWidgetLayout } from "./AccountSetupBackupSeedComponent";

const data = {
  backupCodesVerified: false,
  startBackupProcess: action("startBackupProcess"),
};

storiesOf("AccountSetupBackupWidget", module).add("default", () => (
  <AccountSetupBackupWidgetLayout {...data} />
));
