import * as cn from "classnames";
import { Formik, FormikErrors, FormikProps, yupToFormErrors } from "formik";
import * as React from "react";
import { FormattedMessage } from "react-intl-phraseapp";
import { compose, withHandlers } from "recompose";
import { NumberSchema } from "yup";

import * as YupTS from "../../../../../lib/yup-ts.unsafe";
import { actions } from "../../../../../modules/actions";
import {
  ETxSenderType,
  IAdditionalValidationData,
  TAdditionalDataByType,
} from "../../../../../modules/tx/types";
import { TxUserFlowInputData } from "../../../../../modules/tx/user-flow/withdraw/reducer";
import {
  selectUserFlowTxDetails,
  selectUserFlowTxInput,
  TSelectUserFlowDetails,
} from "../../../../../modules/tx/user-flow/withdraw/selectors";
import {
  EAdditionalValidationDataNotifications,
  EValidationState,
} from "../../../../../modules/tx/validator/reducer";
import {
  selectTxValidationNotifications,
  selectTxValidationState,
} from "../../../../../modules/tx/validator/selectors";
import { isValidFormNumber } from "../../../../../modules/tx/validator/withdraw/utils";
import { selectLiquidEtherBalance } from "../../../../../modules/wallet/selectors";
import { isAddressValid } from "../../../../../modules/web3/utils";
import { appConnect } from "../../../../../store";
import { OmitKeys } from "../../../../../types";
import { Button } from "../../../../shared/buttons";
import { Money } from "../../../../shared/formatters/Money";
import {
  ECurrency,
  ENumberInputFormat,
  ENumberOutputFormat,
} from "../../../../shared/formatters/utils";
import { FormDeprecated } from "../../../../shared/forms";
import { EHeadingSize, Heading } from "../../../../shared/Heading";
import { DataRow } from "../../shared/DataRow";
import {
  EtherAddressFormRow,
  ethereumAddressFormValidation,
} from "./EtherAddressFormRow/EtherAddressFormRow";
import { EtherValueFormRow } from "./EtherValurFormRow.tsx/EtherValueFormRow";
import { ShowAdditionalNotifications } from "./ShowAdditionalNotifications";
import { TransferAllButton } from "./TransferAllButton/TransferAllButton";
import { hasNotification } from "./utils";

import * as styles from "../Withdraw.module.scss";

export type TWithdrawAdditionalData = IAdditionalValidationData &
  TAdditionalDataByType<typeof ETxSenderType.WITHDRAW>;

interface IStateProps {
  userFlowDetails: TSelectUserFlowDetails;
  validationState?: EValidationState;
  notifications: ReadonlyArray<EAdditionalValidationDataNotifications>;
  ethAmount: string;
  txUserFlowInputData: TxUserFlowInputData;
}

export interface IWithdrawData {
  value: string;
  to: string;
  withdrawAll: boolean;
  allowNewAddress: boolean;
  allowSmartContract: boolean;
}

interface IHandlersProps {
  onValidateHandler: (values: IWithdrawData) => void | FormikErrors<IWithdrawData>;
}

interface IDispatchProps {
  onValidate: (txDraft: TxUserFlowInputData) => void;
  onAccept: () => void;
}

type TProps = IStateProps & OmitKeys<IDispatchProps, "onValidate"> & IHandlersProps;

const getWithdrawFormSchema = () =>
  YupTS.object({
    to: ethereumAddressFormValidation,
    value: YupTS.number().enhance((v: NumberSchema) => v.moreThan(0)),
  }).toYup();

const AvailableEthBalance: React.FunctionComponent<{ ethAmount: string }> = ({ ethAmount }) => (
  <DataRow
    className={cn(styles.noSpacing, styles.withTopSpacing)}
    caption={<FormattedMessage id="modal.sent-eth.available-balance" />}
    value={
      <Money
        data-test-id="modals.tx-sender.withdraw-flow.summary.balance"
        className={styles.money}
        value={ethAmount}
        inputFormat={ENumberInputFormat.ULPS}
        outputFormat={ENumberOutputFormat.ONLY_NONZERO_DECIMALS}
        valueType={ECurrency.ETH}
      />
    }
  />
);

const WithdrawLayout: React.FunctionComponent<TProps> = ({
  notifications,
  onAccept,
  onValidateHandler,
  ethAmount,
  validationState,
  txUserFlowInputData,
  userFlowDetails,
}) => (
  <section className={styles.contentWrapper} data-test-id="modals.shared.tx-withdraw.modal">
    <Heading
      size={EHeadingSize.HUGE}
      level={4}
      className={styles.withSpacing}
      decorator={false}
      disableTransform={true}
    >
      <FormattedMessage id="modal.sent-eth.title" />
    </Heading>

    <Formik<IWithdrawData>
      validate={onValidateHandler}
      enableReinitialize={false}
      // Cannot enable now until we update formik to version 2
      // @See https://github.com/jaredpalmer/formik/issues/1439
      initialValues={{
        to: (isAddressValid(txUserFlowInputData.to) && txUserFlowInputData.to) || "",
        value: (isValidFormNumber(txUserFlowInputData.value) && txUserFlowInputData.value) || "",
        withdrawAll: false,
        allowNewAddress: false,
        allowSmartContract: false,
      }}
      isInitialValid={
        isAddressValid(txUserFlowInputData.to) && isValidFormNumber(txUserFlowInputData.value)
      }
      onSubmit={onAccept}
    >
      {({
        isValid,
        isValidating,
        setFieldValue,
        setFieldTouched,
        values,
        errors,
        touched,
      }: FormikProps<IWithdrawData>) => (
        <FormDeprecated>
          <EtherAddressFormRow errors={errors} values={values} />
          <ShowAdditionalNotifications errors={errors} notifications={notifications} />
          <AvailableEthBalance ethAmount={ethAmount} />
          <TransferAllButton
            setFieldValue={setFieldValue}
            ethAmount={ethAmount}
            disabled={validationState === EValidationState.IS_NOT_ACCEPTING_ETHER}
          />
          <EtherValueFormRow
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            valueEuro={userFlowDetails.inputValueEuro}
            values={values}
            notifications={notifications}
            errors={errors}
            touched={touched}
          />

          {validationState === EValidationState.IS_NOT_ACCEPTING_ETHER && (
            <span
              className="text-warning"
              data-test-id="modals.tx-sender.withdraw-flow.withdraw-component.not-accepting-ether"
            >
              <FormattedMessage id="modal.sent-eth.not-accepting-ether" />
            </span>
          )}
          {validationState === EValidationState.NOT_ENOUGH_ETHER_FOR_GAS && (
            <span
              className="text-warning"
              data-test-id="modals.tx-sender.withdraw-flow.withdraw-component.errors.value-higher-than-balance"
            >
              <FormattedMessage id="modals.tx-sender.withdraw-flow.withdraw-component.errors.value-higher-than-balance" />
            </span>
          )}

          <section className="mt-4 text-center">
            <Button
              type="submit"
              disabled={
                !isValid ||
                isValidating ||
                validationState !== EValidationState.VALIDATION_OK ||
                // TODO: Refactor to better readable form
                (hasNotification(
                  EAdditionalValidationDataNotifications.WILL_EMPTY_WALLET,
                  notifications,
                ) &&
                  !values.withdrawAll) ||
                (hasNotification(
                  EAdditionalValidationDataNotifications.IS_SMART_CONTRACT,
                  notifications,
                ) &&
                  !values.allowSmartContract) ||
                (hasNotification(
                  EAdditionalValidationDataNotifications.IS_NEW_ADDRESS,
                  notifications,
                ) &&
                  !values.allowNewAddress) ||
                (hasNotification(
                  EAdditionalValidationDataNotifications.IS_NEW_ADDRESS_WITH_BALANCE,
                  notifications,
                ) &&
                  !values.allowNewAddress)
              }
              data-test-id="modals.tx-sender.withdraw-flow.withdraw-component.send-transaction-button"
            >
              {isValidating || validationState === EValidationState.VALIDATING ? (
                <FormattedMessage id="modal.sent-eth.button-loading" />
              ) : (
                <FormattedMessage id="modal.sent-eth.button" />
              )}
            </Button>
          </section>
        </FormDeprecated>
      )}
    </Formik>
  </section>
);

const Withdraw = compose<TProps, {}>(
  appConnect<IStateProps, IDispatchProps>({
    stateToProps: state => ({
      ethAmount: selectLiquidEtherBalance(state),
      validationState: selectTxValidationState(state),
      notifications: selectTxValidationNotifications(state),
      userFlowDetails: selectUserFlowTxDetails(state),
      txUserFlowInputData: selectUserFlowTxInput(state),
    }),
    dispatchToProps: d => ({
      onAccept: () => {
        d(actions.txUserFlowWithdraw.userFlowAcceptForm());
      },
      onValidate: (txDraft: TxUserFlowInputData) => {
        d(actions.txUserFlowWithdraw.runUserFlowOperations(txDraft));
      },
    }),
  }),
  withHandlers<IStateProps & IDispatchProps, {}>({
    onValidateHandler: ({ onValidate }) => (values: IWithdrawData) => {
      const schema = getWithdrawFormSchema();

      onValidate({
        to: values.to,
        value: values.value,
      });

      try {
        schema.validateSync(values, { abortEarly: false });
      } catch (errors) {
        return yupToFormErrors(errors);
      }
      return undefined;
    },
  }),
)(WithdrawLayout);

export { Withdraw, WithdrawLayout };
