import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import * as React from "react";

import { EtoProgressStepper } from "./EtoProgressStepper";

const stepProps = [
  {
    name: "test",
    isDone: true,
  },
  {
    name: "Test",
    isDone: false,
  },
];

storiesOf("ETO/ProgressStepper", module).add("default", () => (
  <EtoProgressStepper currentStep={2} stepProps={stepProps} onClick={action(`step-click`)} />
));
