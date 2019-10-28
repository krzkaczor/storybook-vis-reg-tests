import * as React from "react";
import { FormattedMessage } from "react-intl-phraseapp";

import {
  selectLightWalletEmailFromQueryString,
  selectPreviousLightWalletEmail,
} from "../../../../modules/web3/selectors";
import { appConnect } from "../../../../store";
import { LoginWithEmailLightWallet } from "./LoginWithEmailLightWallet.unsafe";
import { MissingEmailLightWallet } from "./MissingEmailLightWallet";

import * as styles from "../WalletLight.module.scss";

interface IStateProps {
  email?: string;
}

export const LoginLightWalletComponent: React.FunctionComponent<IStateProps> = ({ email }) => (
  <>
    <h2 className={styles.title} data-test-id="modals.wallet-selector.login-light-wallet.title">
      <FormattedMessage id="wallet-selector.neuwallet.welcome" />
    </h2>

    {email ? <LoginWithEmailLightWallet email={email} /> : <MissingEmailLightWallet />}
  </>
);

export const LoginLightWallet = appConnect<IStateProps>({
  stateToProps: s => ({
    email: selectLightWalletEmailFromQueryString(s) || selectPreviousLightWalletEmail(s.web3),
  }),
})(LoginLightWalletComponent);
