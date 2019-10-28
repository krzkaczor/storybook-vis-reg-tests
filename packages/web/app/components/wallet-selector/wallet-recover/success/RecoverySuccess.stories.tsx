import { storiesOf } from "@storybook/react";
import * as React from "react";

import { RecoverySuccessComponent } from "./RecoverySuccess";

storiesOf("RecoverySuccess", module).add("default", () => (
  <RecoverySuccessComponent goToDashboard={() => {}} />
));
