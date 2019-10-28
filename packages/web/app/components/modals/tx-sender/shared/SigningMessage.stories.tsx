import { storiesOf } from "@storybook/react";
import * as React from "react";

import { withModalBody } from "../../../../utils/storybookHelpers.unsafe";
import { SigningMessage } from "./SigningMessage";

storiesOf("SigningMessage", module)
  .addDecorator(withModalBody())
  .add("default", () => <SigningMessage />);
