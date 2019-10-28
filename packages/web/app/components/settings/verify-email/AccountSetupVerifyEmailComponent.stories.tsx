import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import * as React from "react";

import { AccountSetupVerifyEmailWidgetLayout } from "./AccountSetupVerifyEmailComponent";

const data = {
  isUserEmailVerified: false,
  isThereUnverifiedEmail: true,
  resendEmail: action("resendEmail"),
  addNewEmail: action("addNewEmail"),
  cancelEmail: action("cancelEmail"),
  revertCancelEmail: action("revertCancelEmail"),
  abortEmailUpdate: action("abortEmailUpdate"),
};

storiesOf("AccountSetupVerifyEmailWidget", module)
  .add("initial state", () => (
    <AccountSetupVerifyEmailWidgetLayout {...data} isEmailTemporaryCancelled={false} />
  ))
  .add("email input state", () => (
    <AccountSetupVerifyEmailWidgetLayout {...data} isEmailTemporaryCancelled={true} />
  ));
