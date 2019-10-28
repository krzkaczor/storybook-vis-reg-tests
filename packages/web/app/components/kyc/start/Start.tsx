import * as React from "react";
import { FormattedHTMLMessage, FormattedMessage } from "react-intl-phraseapp";
import { compose } from "redux";

import { actions } from "../../../modules/actions";
import { appConnect } from "../../../store";
import { KycPanel } from "../KycPanel";
import { Panels } from "../shared/Panels";

import * as styles from "../KycPanel.module.scss";

export const personalSteps = [
  {
    label: <FormattedMessage id="kyc.steps.representation" />,
    isChecked: true,
  },
  {
    label: <FormattedMessage id="kyc.steps.personal-details" />,
    isChecked: false,
  },
  {
    label: <FormattedMessage id="kyc.steps.documents-verification" />,
    isChecked: false,
  },
  {
    label: <FormattedMessage id="kyc.steps.review" />,
    isChecked: false,
  },
];

interface IProps {
  goToPerson: () => void;
  goToCompany: () => void;
}

export const KYCStartComponent = ({ ...props }) => (
  <KycPanel
    steps={personalSteps}
    title={<FormattedMessage id="kyc.start.title" />}
    isMaxWidth={true}
  >
    <p className={styles.textFieldNarrow}>
      <FormattedHTMLMessage tagName="span" id="kyc.start.description" />
    </p>
    <Panels
      panels={[
        {
          content: <FormattedMessage id="kyc.start.go-to-personal" />,
          id: 1,
          onClick: () => props.goToPerson(),
          "data-test-id": "kyc-start-go-to-personal",
        },
        {
          content: <FormattedMessage id="kyc.start.go-to-company" />,
          id: 2,
          onClick: () => props.goToCompany(),
          "data-test-id": "kyc-start-go-to-company",
        },
      ]}
    />
  </KycPanel>
);

export const KYCStart = compose<React.FunctionComponent>(
  appConnect<IProps>({
    dispatchToProps: dispatch => ({
      goToPerson: () => dispatch(actions.routing.goToKYCIndividualStart()),
      goToCompany: () => dispatch(actions.routing.goToKYCBusinessData()),
    }),
  }),
)(KYCStartComponent);
