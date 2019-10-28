import { storiesOf } from "@storybook/react";
import * as React from "react";

import { AccountAddressWithHistoryLink } from "./AccountAddress";

storiesOf("AccountAddress", module).add("default", () => (
  <AccountAddressWithHistoryLink address="asdfghjklzxcvbnmqwertyuiop" />
));
