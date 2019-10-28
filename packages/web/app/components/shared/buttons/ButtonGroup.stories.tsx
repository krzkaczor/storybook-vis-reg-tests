import { storiesOf } from "@storybook/react";
import * as React from "react";

import { Button } from "./Button";
import { ButtonGroup } from "./ButtonGroup";

storiesOf("ButtonGroup", module).add("default", () => (
  <ButtonGroup>
    <Button>First button</Button>
    <Button>Second button</Button>
    <Button>Third button</Button>
  </ButtonGroup>
));
