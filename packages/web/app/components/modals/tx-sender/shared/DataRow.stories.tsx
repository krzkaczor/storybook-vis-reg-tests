import { storiesOf } from "@storybook/react";
import * as React from "react";

import { DataRow, DataRowSeparator } from "./DataRow";

storiesOf("DataRow", module).add("default", () => (
  <>
    <DataRow caption="Caption" value="Value" />
    <DataRow caption="Caption" value="Value" />
    <DataRowSeparator />
    <DataRow caption="Caption" value="Value" />
  </>
));
