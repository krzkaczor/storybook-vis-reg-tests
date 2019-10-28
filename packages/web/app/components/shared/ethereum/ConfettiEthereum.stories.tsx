import { storiesOf } from "@storybook/react";
import * as React from "react";

import { ConfettiEthereum } from "./ConfettiEthereum";
import { EEthereumIconSize } from "./EthereumIcon";

storiesOf("ConfettiEthereum", module)
  .add("default", () => <ConfettiEthereum />)
  .add("small", () => <ConfettiEthereum size={EEthereumIconSize.SMALL} />);
