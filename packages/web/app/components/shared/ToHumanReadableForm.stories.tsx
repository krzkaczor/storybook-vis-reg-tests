import { storiesOf } from "@storybook/react";
import * as React from "react";

import { THumanReadableFormat, ToHumanReadableForm } from "./ToHumanReadableForm";

storiesOf("ToHumanReadableForm", module)
  .add("one million", () => <ToHumanReadableForm number={1000000} />)
  .add("one million short", () => (
    <ToHumanReadableForm number={1000000} format={THumanReadableFormat.SHORT} />
  ))
  .add("2 millions", () => <ToHumanReadableForm number={2000000} />)
  .add("2 millions short", () => (
    <ToHumanReadableForm number={2000000} format={THumanReadableFormat.SHORT} />
  ))
  .add("5.5 millions", () => <ToHumanReadableForm number={5500000} />)
  .add("5.5 millions short", () => (
    <ToHumanReadableForm number={5500000} format={THumanReadableFormat.SHORT} />
  ))
  .add("25 millions", () => <ToHumanReadableForm number={25000000} />)
  .add("one thousand", () => <ToHumanReadableForm number={1000} />)
  .add("one thousand short", () => (
    <ToHumanReadableForm number={1000} format={THumanReadableFormat.SHORT} />
  ))
  .add("2 thousands", () => <ToHumanReadableForm number={2000} />)
  .add("9.9 thousands", () => <ToHumanReadableForm number={9900} />)
  .add("125 thousands", () => <ToHumanReadableForm number={125000} />)
  .add("125 thousands short", () => (
    <ToHumanReadableForm number={125000} format={THumanReadableFormat.SHORT} />
  ))
  .add("1", () => <ToHumanReadableForm number={1} />)
  .add("999", () => <ToHumanReadableForm number={999} />)
  .add("1.5 - 10 millions", () => (
    <ToHumanReadableForm number={1500000}>
      {divider => <ToHumanReadableForm number={10000000} divider={divider} />}
    </ToHumanReadableForm>
  ))
  .add("1.5 - 10 millions short", () => (
    <ToHumanReadableForm number={1500000}>
      {divider => (
        <ToHumanReadableForm
          number={10000000}
          divider={divider}
          format={THumanReadableFormat.SHORT}
        />
      )}
    </ToHumanReadableForm>
  ))
  .add("120 - 1000 thousands", () => (
    <ToHumanReadableForm number={120000}>
      {divider => <ToHumanReadableForm number={1000000} divider={divider} />}
    </ToHumanReadableForm>
  ))
  .add("120 - 1000 thousands short", () => (
    <ToHumanReadableForm number={120000}>
      {divider => (
        <ToHumanReadableForm
          number={1000000}
          divider={divider}
          format={THumanReadableFormat.SHORT}
        />
      )}
    </ToHumanReadableForm>
  ))
  .add("500 - 20000", () => (
    <ToHumanReadableForm number={500}>
      {divider => <ToHumanReadableForm number={20000} divider={divider} />}
    </ToHumanReadableForm>
  ))
  .add("500 - 20000 short", () => (
    <ToHumanReadableForm number={500}>
      {divider => (
        <ToHumanReadableForm number={20000} divider={divider} format={THumanReadableFormat.SHORT} />
      )}
    </ToHumanReadableForm>
  ));
