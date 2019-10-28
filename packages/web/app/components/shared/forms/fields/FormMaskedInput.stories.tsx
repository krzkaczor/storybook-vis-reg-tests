import { storiesOf } from "@storybook/react";
import * as React from "react";
import { emailMask } from "text-mask-addons";

import { ECurrency } from "../../formatters/utils";
import { EInputSize } from "../layouts/InputLayout";
import { FormMaskedInput } from "./FormMaskedInput";
import { formWrapper } from "./testingUtils.unsafe";
import { generateMaskFromCurrency } from "./utils.unsafe";

storiesOf("forms/fields/MaskedInput", module)
  .add(
    "default",
    formWrapper({ name: "15532.33" })(() => (
      <FormMaskedInput name="name" mask={generateMaskFromCurrency(ECurrency.EUR)} />
    )),
  )
  .add(
    "with placeholder",
    formWrapper({})(() => (
      <FormMaskedInput
        name="name"
        mask={generateMaskFromCurrency(ECurrency.EUR)}
        placeholder="Placeholder"
      />
    )),
  )
  .add(
    "small",
    formWrapper({ name: "15532.33" })(() => (
      <FormMaskedInput
        name="name"
        mask={generateMaskFromCurrency(ECurrency.EUR)}
        placeholder="Placeholder"
        size={EInputSize.SMALL}
      />
    )),
  )
  .add(
    "with prefix",
    formWrapper({ name: "15532.33" })(() => (
      <FormMaskedInput name="name" mask={generateMaskFromCurrency(ECurrency.EUR)} prefix="Prefix" />
    )),
  )
  .add(
    "with suffix",
    formWrapper({ name: "15532.33" })(() => (
      <FormMaskedInput name="name" mask={generateMaskFromCurrency(ECurrency.EUR)} suffix="Suffix" />
    )),
  )
  .add(
    "guided",
    formWrapper({})(() => <FormMaskedInput name="name" mask={emailMask.mask} guided={true} />),
  );
