import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import * as React from "react";

import { NomineeLinkBankAccountLayout } from "./LinkBankAccount";

storiesOf("Nominee/LinkBankAccount", module).add("no bank account", () => (
  <NomineeLinkBankAccountLayout verifyBankAccount={action("verifyBankAccount")} />
));
