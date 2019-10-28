import * as cn from "classnames";
import * as React from "react";
import { FormattedMessage } from "react-intl-phraseapp";
import { branch, compose, renderComponent } from "recompose";

import { selectIsUserFullyVerified } from "../../modules/auth/selectors";
import { selectIsBankAccountVerified } from "../../modules/bank-transfer-flow/selectors";
import { selectBankAccount, selectIsBankAccountLoading } from "../../modules/kyc/selectors";
import { TBankAccount } from "../../modules/kyc/types";
import { appConnect } from "../../store";
import { CommonHtmlProps, DeepReadonly, OmitKeys } from "../../types";
import { Button, ButtonSize, EButtonLayout } from "../shared/buttons";
import { LoadingIndicator } from "../shared/loading-indicator/LoadingIndicator";
import { BankAccount } from "./BankAccount";

import * as styles from "./VerifiedBankAccount.module.scss";

interface IExternalProps {
  onVerify: () => void;
  withBorder?: boolean;
}

interface IStateProps {
  bankAccount?: DeepReadonly<TBankAccount>;
  isBankAccountLoading: boolean;
  isVerified: boolean;
  isUserFullyVerified: boolean;
}

type IComponentProps = IExternalProps &
  OmitKeys<IStateProps, "isBankAccountLoading"> &
  CommonHtmlProps;

const VerifiedBankAccountComponent: React.FunctionComponent<IComponentProps> = ({
  isVerified,
  isUserFullyVerified,
  bankAccount,
  onVerify,
  className,
  withBorder,
}) => (
  <section className={className}>
    <div className={styles.header}>
      <h4 className={cn(styles.title, { [styles.framed]: withBorder })}>
        <FormattedMessage id="shared-component.wallet-verified-bank-account.title" />
      </h4>
      <Button
        className={styles.linkButton}
        onClick={onVerify}
        data-test-id="locked-wallet.neur.bank-account.link-account"
        layout={EButtonLayout.INLINE}
        size={ButtonSize.SMALL}
        disabled={!isUserFullyVerified}
      >
        <FormattedMessage id="shared-component.wallet-verified-bank-account.link-account" />
      </Button>
    </div>

    {isVerified && bankAccount && bankAccount.hasBankAccount ? (
      <BankAccount withBorder={withBorder} details={bankAccount.details} />
    ) : (
      <span
        className={styles.bankNotVerified}
        data-test-id="locked-wallet.neur.bank-account.not-verified"
      >
        <FormattedMessage id="shared-component.wallet-verified-bank-account.bank-account" />
        <br />
        <FormattedMessage id="shared-component.wallet-verified-bank-account.bank-account.not-verified" />
      </span>
    )}
  </section>
);

const VerifiedBankAccount = compose<IComponentProps, IExternalProps & CommonHtmlProps>(
  appConnect<IStateProps>({
    stateToProps: state => ({
      bankAccount: selectBankAccount(state),
      isBankAccountLoading: selectIsBankAccountLoading(state),
      isVerified: selectIsBankAccountVerified(state),
      isUserFullyVerified: selectIsUserFullyVerified(state),
    }),
  }),
  branch<IStateProps>(props => props.isBankAccountLoading, renderComponent(LoadingIndicator)),
)(VerifiedBankAccountComponent);

export { VerifiedBankAccount, VerifiedBankAccountComponent };
