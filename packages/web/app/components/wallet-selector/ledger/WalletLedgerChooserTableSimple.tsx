import * as cn from "classnames";
import * as React from "react";
import { FormattedMessage } from "react-intl-phraseapp";

import { ILedgerAccount } from "../../../modules/wallet-selector/ledger-wizard/reducer";
import { Button, EButtonLayout } from "../../shared/buttons";
import { Money } from "../../shared/formatters/Money";
import { ECurrency, ENumberInputFormat, ENumberOutputFormat } from "../../shared/formatters/utils";

import * as styles from "./WalletLedgerChooserTableSimple.module.scss";

interface IAccountRow {
  ledgerAccount: ILedgerAccount;
  handleAddressChosen: (ledgerAccount: ILedgerAccount) => void;
}

export class AccountRow extends React.Component<IAccountRow> {
  handleClick = () => {
    this.props.handleAddressChosen(this.props.ledgerAccount);
  };

  render(): React.ReactNode {
    return (
      <tr data-test-id="account-row">
        <td data-test-id="account-address" className={styles.publicKey}>
          {this.props.ledgerAccount.address}
        </td>
        <td data-test-id="account-balance-eth" className={cn(styles.currencyCol, styles.ethCol)}>
          <Money
            value={this.props.ledgerAccount.balanceETH}
            inputFormat={ENumberInputFormat.ULPS}
            valueType={ECurrency.ETH}
            outputFormat={ENumberOutputFormat.ONLY_NONZERO_DECIMALS}
          />
        </td>
        <td data-test-id="account-balance-neu" className={cn(styles.currencyCol, styles.neuCol)}>
          <Money
            value={this.props.ledgerAccount.balanceNEU}
            inputFormat={ENumberInputFormat.ULPS}
            valueType={ECurrency.NEU}
            outputFormat={ENumberOutputFormat.ONLY_NONZERO_DECIMALS}
          />
        </td>
        <td className={styles.select}>
          <Button
            layout={EButtonLayout.SECONDARY}
            data-test-id="button-select"
            onClick={this.handleClick}
          >
            <FormattedMessage id="wallet-selector.ledger.derivation-path-selector.list.row.select-button" />
          </Button>
        </td>
      </tr>
    );
  }
}

export interface IWalletLedgerChooserTableSimple {
  accounts: ReadonlyArray<ILedgerAccount>;
  handleAddressChosen: (ledgerAccount: ILedgerAccount) => void;
}

export const WalletLedgerChooserTableSimple: React.FunctionComponent<
  IWalletLedgerChooserTableSimple
> = ({ accounts, handleAddressChosen }) => (
  <table className={styles.table}>
    <thead>
      <tr>
        <th className="py-3">
          <FormattedMessage id="wallet-selector.ledger.derivation-path-selector.list.header.public-wallet" />
        </th>
        <th colSpan={3}>
          <FormattedMessage id="wallet-selector.ledger.derivation-path-selector.list.header.balance" />
        </th>
      </tr>
    </thead>
    <tbody data-test-id="wallet-ledger-accounts-table-body">
      {accounts.map(a => (
        <AccountRow
          key={a.derivationPath}
          ledgerAccount={a}
          handleAddressChosen={handleAddressChosen}
        />
      ))}
    </tbody>
  </table>
);
