import * as cn from "classnames";
import * as React from "react";
import { FormattedMessage } from "react-intl-phraseapp";

import { CommonHtmlProps, TDataTestId } from "../../types";
import { Avatar } from "./Avatar";
import { CopyToClipboardButton } from "./CopyToClipboardButton";
import { EtherscanAddressLink } from "./links";

import * as styles from "./AccountAddress.module.scss";

export interface IAccountAddressProps {
  address: string;
}

const HistoryLink: React.FunctionComponent<IAccountAddressProps> = ({ address }) => (
  <div className={styles.transactionHistory}>
    <FormattedMessage
      id="shared-components.account-address.transaction-history"
      values={{
        etherscan: (
          <EtherscanAddressLink address={address}>
            <FormattedMessage id="common.text.etherscan" />
          </EtherscanAddressLink>
        ),
      }}
    />
  </div>
);

const AccountAddress: React.FunctionComponent<
  IAccountAddressProps & CommonHtmlProps & TDataTestId
> = ({
  address,
  className,
  "data-test-id": dataTestId = "account-address.your.ether-address.from-div",
}) => (
  <div className={cn(styles.accountAddress, className)}>
    <Avatar seed={address} />
    <span className={styles.address} data-test-id={dataTestId}>
      {address}
    </span>
    <CopyToClipboardButton value={address} />
  </div>
);

const AccountAddressWithHistoryLink: React.FunctionComponent<
  IAccountAddressProps & CommonHtmlProps & TDataTestId
> = ({
  address,
  className,
  "data-test-id": dataTestId = "account-address.your.ether-address.from-div",
}) => (
  <div className={cn(styles.accountAddressWithHistoryLink, className)}>
    <Avatar seed={address} />

    <div className={styles.addressWrapper}>
      <div className={styles.address} data-test-id={dataTestId}>
        {address}
      </div>
      <HistoryLink address={address} />
    </div>

    <CopyToClipboardButton value={address} />
  </div>
);

export { AccountAddressWithHistoryLink, AccountAddress };
