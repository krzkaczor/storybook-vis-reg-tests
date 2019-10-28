import Web3 from "web3";

export interface ILedgerConfig {
  version: string;
  arbitraryDataEnabled: 0 | 1;
}

export interface IDerivationPathToAddress {
  [derivationPath: string]: string;
}

type TLedgerWalletTxParams = { from: string; data: string };
export interface IPromisifiedHookedWalletSubProvider {
  approveMessage: (txParams: TLedgerWalletTxParams) => Promise<string>;
  approvePersonalMessage: (txParams: TLedgerWalletTxParams) => Promise<boolean>;
  approveTransaction: (txParams: TLedgerWalletTxParams) => Promise<boolean>;
  approveTypedMessage: (txParams: TLedgerWalletTxParams) => Promise<boolean>;
  getAccounts: () => Promise<string[]>;
  signPersonalMessage: (txData: { from: string; data: string }) => Promise<string>;
  signTransaction: (txData: Web3.TxData) => Promise<string>;
}

export interface ILedgerCustomProvider extends IPromisifiedHookedWalletSubProvider {
  getTransport: () => any;
}

export interface ILedgerOutput {
  ledgerInstance: ILedgerCustomProvider;
  ledgerWeb3: Web3;
}
