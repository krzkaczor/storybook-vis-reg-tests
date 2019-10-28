import * as React from "react";
import { FormattedMessage } from "react-intl-phraseapp";

import { selectIsLoginRoute } from "../../../modules/wallet-selector/selectors";
import { appConnect } from "../../../store";

interface IStateProps {
  isLoginRoute: boolean;
}

export const LedgerHeaderComponent: React.FunctionComponent<IStateProps> = ({ isLoginRoute }) => (
  <h2 className="text-center" data-test-id="modals.wallet-selector.ledger-wallet.title">
    {isLoginRoute ? (
      <FormattedMessage id="wallet-selector.ledger.login" />
    ) : (
      <FormattedMessage id="wallet-selector.ledger.register" />
    )}
  </h2>
);

export const LedgerHeader = appConnect({
  stateToProps: s => ({
    isLoginRoute: selectIsLoginRoute(s.router),
  }),
})(LedgerHeaderComponent);
