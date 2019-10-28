import { storiesOf } from "@storybook/react";
import * as React from "react";

import { LoginLightWalletComponent } from "./LoginLightWallet";

storiesOf("LoginLightWallet", module)
  .add("Without email set", () => <LoginLightWalletComponent email={undefined} />)
  .add("With valid mail set", () => <LoginLightWalletComponent email="mail@neufund.org" />)
  .add("With invalid mail set", () => <LoginLightWalletComponent email="not+mail@neufund.org" />);
