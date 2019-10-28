import { storiesOf } from "@storybook/react";
import * as React from "react";

import { WalletLedgerChooserComponent } from "./WalletLedgerChooserComponent";

const account1 = {
  derivationPath: "44'/60'/0'/0",
  address: "0xDf5F67E6e4c643a2ceD1f9De88A5da42E1507eFD",
  balanceETH: "3.01560565742718e+22",
  balanceNEU: "4.36661122320682145923329e+23",
};

const account2 = {
  derivationPath: "44'/60'/0'/0/0",
  address: "0x81eb1aCd7bBD6Ec98a504Deb78e923AB22883b73",
  balanceETH: "0",
  balanceNEU: "0",
};

const testData = {
  hasPreviousAddress: false,
  loading: false,
  advanced: false,
  onDerivationPathPrefixChange: () => {},
  onDerivationPathPrefixError: () => {},
  handleAddressChosen: () => {},
  showPrevAddresses: () => {},
  showNextAddresses: () => {},
  handleAdvanced: () => {},
};

storiesOf("Wallet selector/Ledger", module)
  .add("multiple addresses", () => {
    const data = { ...testData, accounts: [account1, account2] };
    return <WalletLedgerChooserComponent {...data} />;
  })
  .add("single address", () => {
    const data = { ...testData, accounts: [account1] };
    return <WalletLedgerChooserComponent {...data} />;
  })
  .add("multiple addresses advanced", () => {
    const data = { ...testData, accounts: [account1, account2] };
    return <WalletLedgerChooserComponent {...data} advanced={true} />;
  })
  .add("single address advanced", () => {
    const data = { ...testData, accounts: [account1] };
    return <WalletLedgerChooserComponent {...data} advanced={true} />;
  });
