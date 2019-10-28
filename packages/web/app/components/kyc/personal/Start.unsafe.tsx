import { FormikProps, withFormik } from "formik";
import * as React from "react";
import { FormattedHTMLMessage, FormattedMessage } from "react-intl-phraseapp";
import { Col, Row } from "reactstrap";
import { compose } from "redux";

import {
  IKycIndividualData,
  KycIndividualDataSchemaRequired,
} from "../../../lib/api/kyc/KycApi.interfaces";
import { actions } from "../../../modules/actions";
import { appConnect } from "../../../store";
import { injectIntlHelpers } from "../../../utils/injectIntlHelpers.unsafe";
import { onEnterAction } from "../../../utils/OnEnterAction";
import { Button } from "../../shared/buttons";
import {
  BOOL_FALSE_KEY,
  BOOL_TRUE_KEY,
  boolify,
  FormDeprecated,
  FormField,
  FormFieldDate,
  FormSelectCountryField,
  FormSelectField,
  FormSelectNationalityField,
  NONE_KEY,
  unboolify,
} from "../../shared/forms";
import { Tooltip } from "../../shared/tooltips";
import { KycPanel } from "../KycPanel";
import { kycRoutes } from "../routes";
import { KycDisclaimer } from "../shared/KycDisclaimer";

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
    isChecked: false,
  },
  {
    label: <FormattedMessage id="kyc.steps.review" />,
    isChecked: false,
  },
];

const PEP_VALUES = {
  [NONE_KEY]: <FormattedMessage id="form.select.please-select" />,
  [BOOL_TRUE_KEY]: <FormattedMessage id="form.select.yes-i-am" />,
  [BOOL_FALSE_KEY]: <FormattedMessage id="form.select.no-i-am-not" />,
};

const HIGH_INCOME_VALUES = {
  [NONE_KEY]: <FormattedMessage id="form.select.please-select" />,
  [BOOL_TRUE_KEY]: <FormattedMessage id="form.select.yes" />,
  [BOOL_FALSE_KEY]: <FormattedMessage id="form.select.no" />,
};

interface IStateProps {
  currentValues?: IKycIndividualData;
  loadingData: boolean;
}

interface IDispatchProps {
  submitForm: (values: IKycIndividualData) => void;
}

type IProps = IStateProps & IDispatchProps & FormikProps<IKycIndividualData>;

const KYCForm = injectIntlHelpers<IProps & IKycIndividualData>(
  ({ intl: { formatIntlMessage }, ...props }) => (
    <FormDeprecated>
      <FormField
        label={formatIntlMessage("form.label.first-name")}
        name="firstName"
        data-test-id="kyc-personal-start-first-name"
      />
      <FormField
        label={formatIntlMessage("form.label.last-name")}
        name="lastName"
        data-test-id="kyc-personal-start-last-name"
      />
      <FormFieldDate
        label={formatIntlMessage("form.label.birth-date")}
        name="birthDate"
        data-test-id="kyc-personal-start-birth-date"
      />
      <h5 className="my-5">
        <FormattedMessage tagName="span" id="kyc.personal.current.address" />
      </h5>
      <FormField
        label={formatIntlMessage("form.label.street-and-number")}
        name="street"
        data-test-id="kyc-personal-start-street"
      />
      <Row>
        <Col xs={12} md={6} lg={8}>
          <FormField
            label={formatIntlMessage("form.label.city")}
            name="city"
            data-test-id="kyc-personal-start-city"
          />
        </Col>
        <Col xs={12} md={6} lg={4}>
          <FormField
            label={formatIntlMessage("form.label.zip-code")}
            name="zipCode"
            data-test-id="kyc-personal-start-zip-code"
          />
        </Col>
      </Row>
      <FormSelectCountryField
        label={formatIntlMessage("form.label.country")}
        name="country"
        data-test-id="kyc-personal-start-country"
      />
      <FormSelectCountryField
        label={formatIntlMessage("form.label.place-of-birth")}
        name="placeOfBirth"
        data-test-id="kyc-personal-start-place-of-birth"
      />
      <FormSelectNationalityField
        label={formatIntlMessage("form.label.nationality")}
        name="nationality"
        data-test-id="kyc-personal-start-nationality"
      />
      <br />
      <FormSelectField
        values={PEP_VALUES}
        label={
          <>
            <FormattedMessage id={"kyc.personal.politically-exposed.question"} />
            <Tooltip
              content={
                <FormattedHTMLMessage
                  tagName="span"
                  id="kyc.personal.politically-exposed.tooltip"
                />
              }
            />
          </>
        }
        name="isPoliticallyExposed"
        extraMessage={
          props.values.isPoliticallyExposed === ("true" as any) ? (
            <FormattedMessage id={"kyc.personal.politically-exposed.disclaimer"} />
          ) : (
            undefined
          )
        }
        data-test-id="kyc-personal-start-is-politically-exposed"
      />
      {process.env.NF_DISABLE_HIGH_INCOME !== "1" && (
        <FormSelectField
          values={HIGH_INCOME_VALUES}
          label={formatIntlMessage("kyc.personal.high-income")}
          name="isHighIncome"
          extraMessage={<FormattedMessage id={"kyc.personal.income.disclaimer"} />}
          data-test-id="kyc-personal-start-has-high-income"
        />
      )}
      <div className="p-4 text-center">
        <Button
          type="submit"
          disabled={!props.isValid || props.loadingData}
          data-test-id="kyc-personal-start-submit-form"
        >
          <FormattedMessage id={"form.save-and-submit"} />
        </Button>
      </div>
    </FormDeprecated>
  ),
);

const KYCEnhancedForm = withFormik<IStateProps & IDispatchProps, IKycIndividualData>({
  validationSchema: KycIndividualDataSchemaRequired,
  isInitialValid: (props: any) => KycIndividualDataSchemaRequired.isValidSync(props.currentValues),
  mapPropsToValues: props => unboolify(props.currentValues as IKycIndividualData),
  enableReinitialize: true,
  handleSubmit: (values, props) => {
    props.props.submitForm(boolify(values));
  },
})(KYCForm);

export const KYCPersonalStartComponent: React.FunctionComponent<
  IStateProps & IDispatchProps
> = props => (
  <KycPanel
    steps={personalSteps}
    backLink={kycRoutes.start}
    isMaxWidth={false}
    title={<FormattedMessage id="kyc.panel.individual-verification" />}
  >
    <KycDisclaimer className="pb-5" />
    <KYCEnhancedForm {...props} />
  </KycPanel>
);

export const KYCPersonalStart = compose<React.FunctionComponent>(
  appConnect<IStateProps, IDispatchProps>({
    stateToProps: state => ({
      currentValues: state.kyc.individualData,
      loadingData: !!state.kyc.individualDataLoading,
    }),
    dispatchToProps: dispatch => ({
      submitForm: (values: IKycIndividualData) =>
        dispatch(actions.kyc.kycSubmitIndividualData(values)),
    }),
  }),
  onEnterAction({
    actionCreator: dispatch => dispatch(actions.kyc.kycLoadIndividualData()),
  }),
)(KYCPersonalStartComponent);
