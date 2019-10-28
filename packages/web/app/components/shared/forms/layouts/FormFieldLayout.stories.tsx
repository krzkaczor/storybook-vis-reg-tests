import { storiesOf } from "@storybook/react";
import * as React from "react";

import { FormFieldLayout } from "./FormFieldLayout";

storiesOf("Core|molecules/FormFieldLayout", module)
  .add("default", () => <FormFieldLayout label="Form field" name="value" />)
  .add("with suffix", () => <FormFieldLayout label="Form field" name="value" suffix="%" />)
  .add("with prefix", () => <FormFieldLayout label="Form field" name="value" prefix="@" />)
  .add("with error message", () => (
    <FormFieldLayout
      label="Form field"
      name="value"
      errorMsg="something is wrong"
      suffix="fufu"
      prefix="€"
    />
  ));
