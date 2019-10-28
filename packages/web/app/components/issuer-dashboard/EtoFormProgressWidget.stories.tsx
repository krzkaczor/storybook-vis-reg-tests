import { storiesOf } from "@storybook/react";
import * as React from "react";

import { EtoFormProgressWidget } from "./EtoFormProgressWidget";

storiesOf("EtoFormProgressWidget", module)
  .add("loading", () => (
    <EtoFormProgressWidget
      to="/test"
      name="test long name"
      isLoading={true}
      disabled={false}
      readonly={false}
      progress={1}
    />
  ))
  .add("edit", () => (
    <EtoFormProgressWidget
      to="/test"
      name="test long name"
      isLoading={false}
      readonly={false}
      disabled={false}
      progress={1}
    />
  ))
  .add("complete", () => (
    <EtoFormProgressWidget
      to="/test"
      name="test long name"
      progress={0.88}
      isLoading={false}
      disabled={false}
      readonly={false}
    />
  ))
  .add("readonly", () => (
    <EtoFormProgressWidget
      to="/test"
      name="test long name"
      progress={0.88}
      isLoading={false}
      disabled={false}
      readonly={true}
    />
  ));
