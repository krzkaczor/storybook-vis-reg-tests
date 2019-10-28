import { storiesOf } from "@storybook/react";
import * as React from "react";

import { WarningAlert } from "./WarningAlert";

storiesOf("Core|Atoms/WarningAlert", module).add("default", () => (
  <WarningAlert>Alert message</WarningAlert>
));
