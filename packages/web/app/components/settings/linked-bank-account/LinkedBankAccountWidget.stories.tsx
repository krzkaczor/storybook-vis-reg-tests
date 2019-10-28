import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import * as React from "react";

import { LinkedBankAccountComponent } from "./LinkedBankAccountWidget";

storiesOf("LinkedBankAccountWidget", module)
  .add("not verified", () => (
    <LinkedBankAccountComponent
      verifyBankAccount={action("verify")}
      isBankAccountVerified={false}
      isUserFullyVerified={true}
    />
  ))
  .add("not verified and blocked to start", () => (
    <LinkedBankAccountComponent
      verifyBankAccount={action("verify")}
      isBankAccountVerified={false}
      isUserFullyVerified={false}
    />
  ))
  .add("verified", () => (
    <LinkedBankAccountComponent
      isBankAccountVerified={true}
      isUserFullyVerified={true}
      verifyBankAccount={action("verify")}
      bankAccount={{
        hasBankAccount: true,
        details: {
          bankAccountNumberLast4: "1234",
          bankName: "mBank",
          name: "Lorem Ipsum",
          isSepa: true,
          swiftCode: "33212",
        },
      }}
    />
  ))
  .add("verified but blocked to start", () => (
    <LinkedBankAccountComponent
      isBankAccountVerified={true}
      isUserFullyVerified={false}
      verifyBankAccount={action("verify")}
      bankAccount={{
        hasBankAccount: true,
        details: {
          bankAccountNumberLast4: "1234",
          bankName: "mBank",
          name: "Lorem Ipsum",
          isSepa: true,
          swiftCode: "33212",
        },
      }}
    />
  ));
