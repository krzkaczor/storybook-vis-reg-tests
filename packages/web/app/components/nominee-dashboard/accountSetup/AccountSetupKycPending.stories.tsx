import { storiesOf } from "@storybook/react";
import * as React from "react";

import { EKycRequestStatus } from "../../../lib/api/kyc/KycApi.interfaces";
import { AccountSetupKycPendingBase } from "./AccountSetupKycPending";

storiesOf("Nominee/KYC", module).add("kyc pending", () => (
  <AccountSetupKycPendingBase kycRequestStatus={EKycRequestStatus.PENDING} />
));
