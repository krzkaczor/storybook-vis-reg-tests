import { storiesOf } from "@storybook/react";
import * as React from "react";

import { FormRange } from "./FormRange";
import { formWrapper } from "./testingUtils.unsafe";

storiesOf("forms/fields/Range", module)
  .add(
    "default",
    formWrapper({ name: 15 })(() => <FormRange name="name" min={10} max={20} unit="%" />),
  )
  .add(
    "with default value",
    formWrapper({ name: 70 })(() => <FormRange name="name" min={0} max={100} unit="%" />),
  )
  .add(
    "with different step",
    formWrapper({ name: 6 })(() => <FormRange name="name" min={0} max={12} step={3} unit="px" />),
  )
  .add(
    "with different units",
    formWrapper({ name: 3 })(() => (
      <FormRange name="name" min={1} max={5} unitMin="week" unitMax="weeks" />
    )),
  )
  .add(
    "without unit",
    formWrapper({ name: 4 })(() => <FormRange name="name" min={0} max={10} step={2} />),
  );
