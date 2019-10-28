import { storiesOf } from "@storybook/react";
import * as React from "react";

import { EthereumQRCode } from "./EthereumQRCode";

storiesOf("EthereumQRCode", module).add("default", () => (
  <EthereumQRCode address="0xEthereumAdress" value={20000000} gas={9999} />
));
