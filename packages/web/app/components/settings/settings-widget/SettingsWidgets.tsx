import * as React from "react";

import { EKycRequestStatus } from "../../../lib/api/kyc/KycApi.interfaces";
import { EColumnSpan } from "../../layouts/Container";
import { BackupSeedWidget } from "../backup-seed/BackupSeedWidget";
import { KycStatusWidget } from "../kyc-states/KycStatusWidget";
import { VerifyEmailWidget } from "../verify-email/VerifyEmailWidget";

interface IProps {
  isDynamic: boolean;
  isLightWallet?: boolean;
  verifiedEmail?: string;
  backupCodesVerified?: boolean;
  requestStatus?: EKycRequestStatus;
  columnSpan?: EColumnSpan;
}

export const SettingsWidgets: React.FunctionComponent<IProps> = ({
  isLightWallet,
  backupCodesVerified,
  verifiedEmail,
  isDynamic,
  requestStatus,
  columnSpan,
}) => {
  let settingsStepCounter = 0;

  return (
    <>
      {(!isDynamic || !verifiedEmail) && (
        <VerifyEmailWidget step={++settingsStepCounter} columnSpan={columnSpan} />
      )}
      {(!isDynamic || !backupCodesVerified) && isLightWallet && (
        <BackupSeedWidget step={++settingsStepCounter} columnSpan={columnSpan} />
      )}
      {(!isDynamic || requestStatus !== EKycRequestStatus.ACCEPTED) && (
        <KycStatusWidget step={++settingsStepCounter} columnSpan={columnSpan} />
      )}
    </>
  );
};
