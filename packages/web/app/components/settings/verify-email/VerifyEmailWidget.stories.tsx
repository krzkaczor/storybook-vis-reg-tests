import { storiesOf } from "@storybook/react";
import * as React from "react";

import { VerifyEmailWidgetBase } from "./VerifyEmailWidget";

storiesOf("VerifyEmailWidgetBase", module)
  .add("verified email", () => (
    <VerifyEmailWidgetBase
      isUserEmailVerified={true}
      isThereUnverifiedEmail={false}
      isEmailTemporaryCancelled={false}
      resendEmail={() => {}}
      revertCancelEmail={() => {}}
      cancelEmail={() => {}}
      addNewEmail={() => {}}
      abortEmailUpdate={() => {}}
      step={1}
      verifiedEmail="email@test.com"
    />
  ))
  .add("unverified and verified emails", () => (
    <VerifyEmailWidgetBase
      isUserEmailVerified={true}
      isEmailTemporaryCancelled={false}
      isThereUnverifiedEmail={true}
      revertCancelEmail={() => {}}
      resendEmail={() => {}}
      cancelEmail={() => {}}
      addNewEmail={() => {}}
      abortEmailUpdate={() => {}}
      step={1}
      unverifiedEmail="email@test.com"
      verifiedEmail="verified_email@test.com"
    />
  ))
  .add("unverified email", () => (
    <VerifyEmailWidgetBase
      isUserEmailVerified={false}
      isEmailTemporaryCancelled={false}
      revertCancelEmail={() => {}}
      cancelEmail={() => {}}
      isThereUnverifiedEmail={true}
      resendEmail={() => {}}
      addNewEmail={() => {}}
      abortEmailUpdate={() => {}}
      step={1}
      unverifiedEmail="email@test.com"
    />
  ))
  .add("no email", () => (
    <VerifyEmailWidgetBase
      cancelEmail={() => {}}
      isUserEmailVerified={false}
      revertCancelEmail={() => {}}
      isThereUnverifiedEmail={false}
      isEmailTemporaryCancelled={false}
      abortEmailUpdate={() => {}}
      resendEmail={() => {}}
      addNewEmail={() => {}}
      step={1}
    />
  ))
  .add("cancellation in process", () => (
    <VerifyEmailWidgetBase
      isUserEmailVerified={false}
      revertCancelEmail={() => {}}
      cancelEmail={() => {}}
      isThereUnverifiedEmail={true}
      isEmailTemporaryCancelled={true}
      resendEmail={() => {}}
      addNewEmail={() => {}}
      abortEmailUpdate={() => {}}
      step={1}
    />
  ));
