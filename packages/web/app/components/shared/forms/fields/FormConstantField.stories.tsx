import { storiesOf } from "@storybook/react";
import * as React from "react";

import { FormConstantField } from "./FormConstantField";

storiesOf("forms/fields/ConstantField", module)
  .add("default", () => <FormConstantField value="test" />)
  .add("with error", () => <FormConstantField value="test" errorMessage={"Value is not valid"} />);
