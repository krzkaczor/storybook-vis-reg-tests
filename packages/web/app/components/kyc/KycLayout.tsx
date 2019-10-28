import * as React from "react";
import { FormattedMessage } from "react-intl-phraseapp";

import { EKycRequestStatus, EKycRequestType } from "../../lib/api/kyc/KycApi.interfaces";
import { Button, EButtonLayout, EIconPosition } from "../shared/buttons";
import { KycPanel } from "./KycPanel";
import { KycRouter } from "./Router";
import { KYCAddDocuments } from "./shared/AddDocuments";

import * as addFile from "../../assets/img/inline_icons/add_file.svg";
import * as arrowLeft from "../../assets/img/inline_icons/arrow_left.svg";

export const personalSteps = [
  {
    label: <FormattedMessage id="kyc.steps.representation" />,
    isChecked: true,
  },
  {
    label: <FormattedMessage id="kyc.steps.personal-details" />,
    isChecked: true,
  },
  {
    label: <FormattedMessage id="kyc.steps.documents-verification" />,
    isChecked: true,
  },
  {
    label: <FormattedMessage id="kyc.steps.review" />,
    isChecked: true,
  },
];

export const businessSteps = [
  {
    label: <FormattedMessage id="kyc.steps.representation" />,
    isChecked: true,
  },
  {
    label: <FormattedMessage id="kyc.steps.company-details" />,
    isChecked: true,
  },
  {
    label: <FormattedMessage id="kyc.steps.legal-representation" />,
    isChecked: true,
  },
  {
    label: <FormattedMessage id="kyc.steps.review" />,
    isChecked: true,
  },
];

type IProps = {
  requestLoading?: boolean;
  requestStatus?: EKycRequestStatus;
  redirectUrl: string;
  pendingRequestType: EKycRequestType | undefined;
  hasVerifiedEmail: boolean;
  reopenRequest: () => void;
  goToProfile: () => void;
  goToDashboard: () => void;
};

interface IState {
  showAdditionalFileUpload: boolean;
}

class RequestStateInfo extends React.Component<IProps, IState> {
  state = {
    showAdditionalFileUpload: false,
  };

  render(): React.ReactNode {
    const steps =
      this.props.pendingRequestType === EKycRequestType.BUSINESS ? businessSteps : personalSteps;
    const settingsButton = (
      <div className="p-4 text-center">
        <Button
          layout={EButtonLayout.SECONDARY}
          iconPosition={EIconPosition.ICON_BEFORE}
          svgIcon={arrowLeft}
          onClick={this.props.goToProfile}
        >
          <FormattedMessage id="kyc.request-state.go-to-profile" />
        </Button>
      </div>
    );
    if (!this.props.requestStatus) {
      return (
        <KycPanel
          steps={steps}
          description={<FormattedMessage id="kyc.request-state.description" />}
        >
          {settingsButton}
        </KycPanel>
      );
    }
    if (this.props.requestStatus === EKycRequestStatus.PENDING) {
      return (
        <KycPanel
          title={<FormattedMessage id="kyc.request-state.pending.title" />}
          steps={steps}
          description={<FormattedMessage id="kyc.request-state.pending.description" />}
          data-test-id="kyc-panel-pending"
        >
          {!this.state.showAdditionalFileUpload && (
            <Button
              layout={EButtonLayout.SECONDARY}
              iconPosition={EIconPosition.ICON_BEFORE}
              svgIcon={addFile}
              onClick={() => this.setState({ showAdditionalFileUpload: true })}
            >
              <FormattedMessage id="kyc.request-state.pending.add-files-button" />
            </Button>
          )}
          {this.props.pendingRequestType && this.state.showAdditionalFileUpload && (
            <KYCAddDocuments uploadType={this.props.pendingRequestType} />
          )}
          <br /> <br />
          {settingsButton}
        </KycPanel>
      );
    }
    if (this.props.requestStatus === EKycRequestStatus.ACCEPTED) {
      return (
        <KycPanel
          title={<FormattedMessage id="kyc.request-state.accepted.title" />}
          steps={steps}
          description={<FormattedMessage id="kyc.request-state.accepted.description" />}
        >
          {settingsButton}
        </KycPanel>
      );
    }
    if (this.props.requestStatus === EKycRequestStatus.REJECTED) {
      return (
        <KycPanel
          title={<FormattedMessage id="kyc.request-state.rejected.title" />}
          steps={steps}
          description={<FormattedMessage id="kyc.request-state.rejected.description" />}
        >
          {settingsButton}
        </KycPanel>
      );
    }
    if (this.props.requestStatus === EKycRequestStatus.OUTSOURCED) {
      return (
        <KycPanel
          title={<FormattedMessage id="kyc.request-state.outsourced.title" />}
          steps={steps}
          data-test-id="kyc-panel-outsourced"
          description={<FormattedMessage id="kyc.request-state.outsourced.description" />}
        >
          <div className="p-4 text-center">
            <a href={this.props.redirectUrl}>
              <FormattedMessage id="kyc.request-state.click-here-to-continue" />
            </a>
          </div>
        </KycPanel>
      );
    }
    return <div />;
  }
}

const KycLayout: React.FunctionComponent<IProps> = props => {
  const router = props.requestStatus === EKycRequestStatus.DRAFT ? <KycRouter /> : null;
  return (
    <>
      <RequestStateInfo {...props} />
      {router}
    </>
  );
};

export { KycLayout };
