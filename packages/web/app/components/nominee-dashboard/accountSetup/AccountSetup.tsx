import * as React from "react";
import { FormattedMessage } from "react-intl-phraseapp";
import { branch, compose, renderComponent, renderNothing, withProps } from "recompose";

import { EKycRequestStatus } from "../../../lib/api/kyc/KycApi.interfaces";
import {
  selectBackupCodesVerified,
  selectIsUserEmailVerified,
} from "../../../modules/auth/selectors";
import { selectKycRequestStatus } from "../../../modules/kyc/selectors";
import { appConnect } from "../../../store";
import { Panel } from "../../shared/Panel";
import { DashboardTitle } from "../NomineeDashboardTitle";
import { nomineeAccountSetupSteps } from "./AccountSetupData";
import { AccountSetupStep } from "./AccountSetupFlow";
import { AccountSetupKycPending } from "./AccountSetupKycPending";
import { IStepComponentProps } from "./types";
import { prepareSetupAccountSteps } from "./utils";

import * as styles from "../NomineeDashboard.module.scss";

interface IStateProps {
  emailVerified: boolean;
  backupCodesVerified: boolean;
  kycRequestStatus: EKycRequestStatus;
}

export interface INomineeAccountSetupSteps {
  accountSetupStepsData: IStepComponentProps[];
}

export const AccountSetupLayout: React.FunctionComponent<INomineeAccountSetupSteps> = ({
  accountSetupStepsData,
}) => (
  <>
    <DashboardTitle
      title={<FormattedMessage id="account-setup.welcome-to-neufund" />}
      text={<FormattedMessage id="account-setup.please-complete-setup" />}
    />
    <Panel className={styles.accountSetupContainer}>
      {accountSetupStepsData.map((stepData: IStepComponentProps) => (
        <AccountSetupStep {...stepData} />
      ))}
    </Panel>
  </>
);

export const AccountSetup = compose<INomineeAccountSetupSteps, {}>(
  appConnect<IStateProps | null>({
    stateToProps: state => {
      const kycRequestStatus = selectKycRequestStatus(state);
      if (kycRequestStatus !== undefined) {
        return {
          emailVerified: selectIsUserEmailVerified(state.auth),
          backupCodesVerified: selectBackupCodesVerified(state),
          kycRequestStatus,
        };
      } else {
        return null;
      }
    },
  }),
  branch<IStateProps | null>(props => props === null, renderNothing),
  branch<IStateProps>(
    // todo this is a workaround, need to sort out what to do in case of ignored/rejected states
    props =>
      props.emailVerified &&
      props.backupCodesVerified &&
      [EKycRequestStatus.PENDING, EKycRequestStatus.IGNORED, EKycRequestStatus.REJECTED].includes(
        props.kycRequestStatus,
      ),
    renderComponent(AccountSetupKycPending),
  ),
  withProps<INomineeAccountSetupSteps, IStateProps>(
    ({ emailVerified, backupCodesVerified, kycRequestStatus }: IStateProps) => ({
      accountSetupStepsData: prepareSetupAccountSteps(
        nomineeAccountSetupSteps(
          emailVerified,
          backupCodesVerified,
          kycRequestStatus !== EKycRequestStatus.DRAFT,
        ),
      ),
    }),
  ),
)(AccountSetupLayout);
