import * as cn from "classnames";
import { FormikErrors, FormikTouched, FormikValues } from "formik";
import * as React from "react";
import { FormattedMessage } from "react-intl-phraseapp";

import { EAdditionalValidationDataNotifications } from "../../../../../../modules/tx/validator/reducer";
import { isValidFormNumber } from "../../../../../../modules/tx/validator/withdraw/utils";
import { Money } from "../../../../../shared/formatters/Money";
import {
  ECurrency,
  ENumberInputFormat,
  ENumberOutputFormat,
} from "../../../../../shared/formatters/utils";
import { EInputTheme, FormFieldBoolean, FormLabel } from "../../../../../shared/forms";
import { MaskedNumberInput } from "../../../../../shared/MaskedNumberInput";
import { hasNotification } from "../utils";

import * as ethIcon from "../../../../../../assets/img/eth_icon.svg";
import * as styles from "../../Withdraw.module.scss";

const EtherValueFormRow: React.FunctionComponent<{
  disabled?: boolean;
  valueEuro: string;
  setFieldValue: (field: string, value: string, shouldValidate?: boolean) => void;
  setFieldTouched: (field: string, touched?: boolean, shouldValidate?: boolean) => void;
  values: FormikValues;
  notifications: ReadonlyArray<EAdditionalValidationDataNotifications>;
  errors: FormikErrors<{ value: string }>;
  touched: FormikTouched<{ value: boolean }>;
}> = ({
  setFieldValue,
  setFieldTouched,
  values,
  notifications: warnings,
  valueEuro,
  errors,
  disabled,
  touched,
}) => (
  <>
    <section>
      <FormLabel for="value" className={styles.label}>
        <FormattedMessage id="modal.sent-eth.amount" />
      </FormLabel>
      <MaskedNumberInput
        className="text-right"
        storageFormat={ENumberInputFormat.FLOAT}
        valueType={ECurrency.ETH}
        outputFormat={ENumberOutputFormat.ONLY_NONZERO_DECIMALS}
        data-test-id="modals.tx-sender.withdraw-flow.withdraw-component.value"
        name="value"
        reverseMetaInfo={true}
        value={values.value}
        onChangeFn={value => {
          setFieldValue("value", value);
          setFieldTouched("value", true);
        }}
        returnInvalidValues={true}
        disabled={disabled}
        showUnits={true}
        theme={EInputTheme.BOX}
        icon={ethIcon}
      />
    </section>
    <section
      className={cn(styles.withSpacing, "text-right", {
        [styles.compensateSpacing]: errors.value && touched.value,
      })}
    >
      <small>
        {"= "}
        <Money
          value={
            isValidFormNumber(valueEuro)
              ? valueEuro
              : "0" /* Show 0 if form is invalid due of initially populated state */
          }
          inputFormat={ENumberInputFormat.ULPS}
          valueType={ECurrency.EUR}
          outputFormat={ENumberOutputFormat.ONLY_NONZERO_DECIMALS}
        />
      </small>
    </section>
    {hasNotification(EAdditionalValidationDataNotifications.WILL_EMPTY_WALLET, warnings) && (
      <FormFieldBoolean
        className={styles.withSpacing}
        data-test-id="modals.tx-sender.withdraw-flow.withdraw-component.will-empty-wallet"
        name="withdrawAll"
        label={
          <FormattedMessage id="modals.tx-sender.withdraw-flow.withdraw-component.errors.value-will-empty-wallet" />
        }
      />
    )}
  </>
);

export { EtherValueFormRow };
