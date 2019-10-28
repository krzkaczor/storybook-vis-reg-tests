import * as React from "react";
import { FormattedMessage } from "react-intl-phraseapp";

import { TBankAccount } from "../../../modules/kyc/types";
import { DeepReadonly } from "../../../types";
import { EColumnSpan } from "../../layouts/Container";
import { Button, ButtonSize, EButtonLayout, EIconPosition } from "../../shared/buttons";
import { Panel } from "../../shared/Panel";
import { BankAccount } from "../../wallet/BankAccount";
import { connectLinkBankAccountComponent } from "./ConnectLinkBankAccount";

import * as bankIcon from "../../../assets/img/bank-transfer/bank-icon.svg";
import * as arrowRight from "../../../assets/img/inline_icons/arrow_right.svg";
import * as styles from "./LinkedBankAccountWidget.module.scss";

interface IDispatchProps {
  verifyBankAccount: () => void;
}

interface IStateProps {
  bankAccount?: DeepReadonly<TBankAccount>;
  isBankAccountVerified: boolean;
  isUserFullyVerified: boolean;
}

interface IExternalProps {
  columnSpan?: EColumnSpan;
}

type IComponentProps = IStateProps & IDispatchProps;

const LinkAccount: React.FunctionComponent<IComponentProps> = ({
  verifyBankAccount,
  isUserFullyVerified,
}) => (
  <>
    <img className={styles.icon} src={bankIcon} alt="" />
    <Button
      onClick={verifyBankAccount}
      disabled={!isUserFullyVerified}
      data-test-id="linked-bank-account-widget.link-account"
      layout={EButtonLayout.SECONDARY}
      size={ButtonSize.SMALL}
      iconPosition={EIconPosition.ICON_AFTER}
      svgIcon={arrowRight}
    >
      <FormattedMessage id="linked-bank-account-widget.verify" />
    </Button>
  </>
);

const LinkedBankAccountComponent: React.FunctionComponent<
  IComponentProps & IExternalProps
> = props => (
  <Panel
    headerText={<FormattedMessage id="linked-bank-account-widget.header" />}
    columnSpan={props.columnSpan}
  >
    <div className={styles.bankAccountButtonWrapper}>
      <section className={styles.bankAccountButton}>
        {props.isBankAccountVerified && props.bankAccount && props.bankAccount.hasBankAccount ? (
          <BankAccount details={props.bankAccount.details} />
        ) : (
          <LinkAccount {...props} />
        )}
      </section>
    </div>
    {props.isBankAccountVerified && (
      <Button
        className={styles.linkButton}
        onClick={props.verifyBankAccount}
        disabled={!props.isUserFullyVerified}
        data-test-id="linked-bank-account-widget.link-different-account"
        layout={EButtonLayout.INLINE}
        size={ButtonSize.SMALL}
      >
        <FormattedMessage id="linked-bank-account-widget.link-different" />
      </Button>
    )}
  </Panel>
);

const LinkedBankAccountWidget = connectLinkBankAccountComponent<IExternalProps>(
  LinkedBankAccountComponent,
);

export { LinkedBankAccountWidget, LinkedBankAccountComponent };
