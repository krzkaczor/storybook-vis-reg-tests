import { storiesOf } from "@storybook/react";
import * as React from "react";

import { EEthereumIconSize, EEthereumIconTheme, EthereumIcon } from "./EthereumIcon";

storiesOf("EthereumIcon", module)
  .add("default (green spinning)", () => <EthereumIcon />)
  .add("silver spinning", () => <EthereumIcon theme={EEthereumIconTheme.SILVER} />)
  .add("green not spinning", () => <EthereumIcon spinning={false} />)
  .add("small green spinning", () => <EthereumIcon size={EEthereumIconSize.SMALL} />)
  .add("small green not spinning", () => (
    <EthereumIcon size={EEthereumIconSize.SMALL} spinning={false} />
  ))
  .add("small silver not spinning", () => (
    <EthereumIcon
      size={EEthereumIconSize.SMALL}
      theme={EEthereumIconTheme.SILVER}
      spinning={false}
    />
  ));
