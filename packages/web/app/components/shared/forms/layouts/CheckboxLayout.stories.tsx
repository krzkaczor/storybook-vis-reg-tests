import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import * as React from "react";

import { CheckboxLayout, ECheckboxLayout, RadioButtonLayout } from "./CheckboxLayout";

storiesOf("forms/layout/CheckboxLayout && RadioButtonLayout", module)
  .add("checkbox inline (default)", () => (
    <>
      <CheckboxLayout name="bmw" checked={false} label="bmw" onChange={action("onClick")} />
      <CheckboxLayout name="audi" checked={true} label="audi" onChange={action("onClick")} />
      <CheckboxLayout
        name="ford"
        checked={false}
        disabled={true}
        label="ford"
        onChange={action("onClick")}
      />
      <CheckboxLayout
        name="volvo"
        checked={true}
        disabled={true}
        label="volvo"
        onChange={action("onClick")}
      />
    </>
  ))
  .add("checkbox block", () => (
    <>
      <CheckboxLayout
        layout={ECheckboxLayout.BLOCK}
        name="bmw"
        checked={false}
        label="bmw"
        onChange={action("onClick")}
      />
      <CheckboxLayout
        layout={ECheckboxLayout.BLOCK}
        name="audi"
        checked={true}
        label="audi"
        onChange={action("onClick")}
      />
      <CheckboxLayout
        layout={ECheckboxLayout.BLOCK}
        name="ford"
        checked={false}
        disabled={true}
        label="ford"
        onChange={action("onClick")}
      />
      <CheckboxLayout
        layout={ECheckboxLayout.BLOCK}
        name="volvo"
        checked={true}
        disabled={true}
        label="volvo"
        onChange={action("onClick")}
      />
    </>
  ))
  .add("radio inline (default)", () => (
    <>
      <RadioButtonLayout onChange={action("onClick")} name="car" value="bmw" label="bmw" />
      <RadioButtonLayout onChange={action("onClick")} name="car" value="audi" label="audi" />
      <RadioButtonLayout onChange={action("onClick")} name="car" value="ford" label="ford" />
      <RadioButtonLayout onChange={action("onClick")} name="car" value="volvo" label="volvo" />
    </>
  ))
  .add("radio block", () => (
    <>
      <RadioButtonLayout
        layout={ECheckboxLayout.BLOCK}
        onChange={action("onClick")}
        name="car"
        checked={true}
        value="bmw"
        label="bmw"
      />
      <RadioButtonLayout
        layout={ECheckboxLayout.BLOCK}
        onChange={action("onClick")}
        checked={false}
        name="car"
        value="audi"
        label="audi"
      />
      <RadioButtonLayout
        layout={ECheckboxLayout.BLOCK}
        onChange={action("onClick")}
        checked={true}
        disabled={true}
        name="car"
        value="ford"
        label="ford"
      />
      <RadioButtonLayout
        layout={ECheckboxLayout.BLOCK}
        onChange={action("onClick")}
        checked={false}
        disabled={true}
        name="car"
        value="volvo"
        label="volvo"
      />
    </>
  ));
