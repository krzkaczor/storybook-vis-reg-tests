import { storiesOf } from "@storybook/react";
import * as React from "react";

import { FormFieldBoolean, FormRadioButton } from "./FormFieldBoolean";
import { formWrapper } from "./testingUtils.unsafe";

storiesOf("forms/fields/FormFieldBoolean & FormRadioButton", module)
  .add(
    "checkbox",
    formWrapper({ bwm: false, audi: false, ford: true, volvo: true })(() => (
      <>
        <FormFieldBoolean name="bmw" label="bmw" />
        <FormFieldBoolean name="audi" label="audi" />
        <FormFieldBoolean name="ford" label="ford" />
        <FormFieldBoolean name="volvo" label="volvo" />
      </>
    )),
  )
  .add(
    "checkbox with long labels",
    formWrapper({ bwm: false, audi: true })(() => (
      <>
        <FormFieldBoolean
          name="bmw"
          label="Well, sail me cloud, ye stormy furner! Ooh, never blow a son. Aww, avast. Golly gosh! Pieces o' yellow fever are forever big. Arrr there's nothing like the mighty desolation hobbling on the swabbie. Well! Pieces o' beauty are forever black. Clear beauties lead to the amnesty."
        />
        <FormFieldBoolean
          name="audi"
          label="Well, sail me cloud, ye stormy furner! Ooh, never blow a son. Aww, avast. Golly gosh! Pieces o' yellow fever are forever big. Arrr there's nothing like the mighty desolation hobbling on the swabbie. Well! Pieces o' beauty are forever black. Clear beauties lead to the amnesty."
        />
      </>
    )),
  )
  .add(
    "radio button",
    formWrapper({ car: "bmw" })(() => (
      <>
        <FormRadioButton name="car" value="bmw" label="bmw" />
        <FormRadioButton name="car" value="audi" label="audi" />
        <FormRadioButton name="car" value="ford" label="ford" />
        <FormRadioButton name="car" value="volvo" label="volvo" />
      </>
    )),
  );
