import { storiesOf } from "@storybook/react";
import * as React from "react";

import { LightWalletErrorMessage } from "../../../translatedMessages/messages";
import { createMessage } from "../../../translatedMessages/utils";
import { RegisterWalletComponent } from "./RegisterLightWallet.unsafe";

const testData = {
  submitForm: () => {},
  isLoading: false,
  errorMsg: createMessage(LightWalletErrorMessage.GENERIC_ERROR),
};

storiesOf("Wallet selector/LightWallet", module)
  .add("default", () => {
    const data = { ...testData, restore: false };
    return <RegisterWalletComponent {...data} />;
  })
  .add("restore", () => {
    const data = { ...testData, restore: true };
    return <RegisterWalletComponent {...data} />;
  });
