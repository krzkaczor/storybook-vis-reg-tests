import { storiesOf } from "@storybook/react";
import * as React from "react";

import { FormStaticRadioButton } from "./FormStaticRadioButton";
import { formWrapper } from "./testingUtils.unsafe";

storiesOf("forms/fields/FormStaticRadioButton", module).add(
  "default",
  formWrapper({ name: "foo " })(() => (
    <FormStaticRadioButton value="bla" label="you have no choice" />
  )),
);
