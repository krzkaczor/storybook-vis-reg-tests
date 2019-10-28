import * as React from "react";
import { FormattedMessage } from "react-intl-phraseapp";

import {
  EKycRequestStatus,
  ERequestOutsourcedStatus,
} from "../../../lib/api/kyc/KycApi.interfaces";
import { EUserType } from "../../../lib/api/users/interfaces";
import { Button, EButtonLayout, EButtonTheme } from "../../shared/buttons/Button";
import { LoadingIndicator } from "../../shared/loading-indicator/LoadingIndicator";
import { WarningAlert } from "../../shared/WarningAlert";
import { connectKycStatusWidget } from "./ConnectKycStatus";

import * as styles from "./AccountSetupKycComponent.module.scss";

interface IStateProps {
  requestStatus?: EKycRequestStatus;
  requestOutsourcedStatus?: ERequestOutsourcedStatus;
  isUserEmailVerified: boolean;
  isLoading: boolean;
  backupCodesVerified: boolean;
  error?: string;
  externalKycUrl?: string;
  userType: EUserType;
}

interface IDispatchProps {
  onGoToDashboard: () => void;
  cancelInstantId: () => void;
  onGoToKycHome: () => void;
}

export const AccountSetupKycStartLayout: React.FunctionComponent<IStateProps & IDispatchProps> = ({
  isLoading,
  error,
  onGoToKycHome,
}) => {
  if (isLoading) {
    return <LoadingIndicator className={styles.loading} />;
  } else if (error) {
    return (
      <WarningAlert>
        <FormattedMessage id="settings.kyc-widget.error" />
      </WarningAlert>
    );
  } else {
    return (
      <section
        className={styles.accountSetupSection}
        data-test-id="account-setup-start-kyc-section"
      >
        <p className={styles.accountSetupText}>
          <FormattedMessage id="account-setup.kyc-widget-text" />
        </p>
        <Button
          layout={EButtonLayout.PRIMARY}
          theme={EButtonTheme.BRAND}
          type="button"
          onClick={onGoToKycHome}
          data-test-id="start-kyc-button"
        >
          <FormattedMessage id="account-setup.kyc-widget-start-kyc" />
        </Button>
      </section>
    );
  }
};

export const AccountSetupKycPendingLayout: React.FunctionComponent<
  IStateProps & IDispatchProps
> = ({ onGoToKycHome }) => (
  <>
    <Button
      layout={EButtonLayout.PRIMARY}
      theme={EButtonTheme.BRAND}
      type="button"
      onClick={onGoToKycHome}
      data-test-id="kyc-additional-documents-button"
    >
      <FormattedMessage id="settings.kyc-status-widget.submit-additional-documents" />
    </Button>
  </>
);

export const AccountSetupKycComponent = connectKycStatusWidget<{}>(AccountSetupKycStartLayout);
export const AccountSetupKycPendingComponent = connectKycStatusWidget<{}>(
  AccountSetupKycPendingLayout,
);
