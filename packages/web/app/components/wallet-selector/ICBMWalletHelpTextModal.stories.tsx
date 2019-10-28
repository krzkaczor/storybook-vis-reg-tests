import { storiesOf } from "@storybook/react";
import * as React from "react";

import { withModalBody } from "../../utils/storybookHelpers.unsafe";
import { ICBMWalletHelpTextModal } from "./ICBMWalletHelpTextModal";

storiesOf("ICBMWalletHelpTextModal", module)
  .addDecorator(withModalBody())
  .add("default", () => <ICBMWalletHelpTextModal />);
