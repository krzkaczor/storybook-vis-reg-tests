import * as React from "react";
import { FormattedMessage } from "react-intl-phraseapp";

import { AccountSetupBackupSeedComponent } from "../../settings/backup-seed/AccountSetupBackupSeedComponent";
import { AccountSetupKycComponent } from "../../settings/kyc-states/AccountSetupKycComponent";
import { VerifyEmailComponent } from "../../settings/verify-email/AccountSetupVerifyEmailComponent";
import { IAccountSetupStepData } from "./types";

export const nomineeAccountSetupSteps = (
  emailVerified: boolean,
  backupCodesVerified: boolean,
  kycCompleted: boolean,
): IAccountSetupStepData[] => [
  {
    key: "verifyEmail",
    conditionCompleted: emailVerified,
    title: <FormattedMessage id="account-setup.verify-email" />,
    component: <VerifyEmailComponent />,
  },
  {
    key: "verifyBackupCodes",
    conditionCompleted: backupCodesVerified,
    title: <FormattedMessage id="account-setup.verify-backup-codes" />,
    component: <AccountSetupBackupSeedComponent />,
  },
  {
    key: "startKyc",
    conditionCompleted: kycCompleted,
    title: <FormattedMessage id="account-setup.verify-your-company" />,
    component: <AccountSetupKycComponent />,
  },
];
