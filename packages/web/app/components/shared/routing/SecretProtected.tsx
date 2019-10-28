import * as queryString from "query-string";
import * as React from "react";
import { Redirect } from "react-router";

import { appRoutes } from "../../appRoutes";
import { WalletSelector } from "../../wallet-selector/WalletSelector";

const SecretProtected = <T extends {}>(Component: React.ComponentType<T>): React.ComponentType<T> =>
  class extends React.Component<T> {
    shouldComponentUpdate(): boolean {
      return false;
    }

    render(): React.ReactNode {
      const params = queryString.parse(window.location.search);
      const isIssuersSecret = process.env.NF_ISSUERS_SECRET;

      if (isIssuersSecret === undefined || params.etoSecret === isIssuersSecret) {
        return <Component isSecretProtected={Boolean(isIssuersSecret)} {...this.props} />;
      }

      return <Redirect to={appRoutes.root} />;
    }
  };

const EtoSecretProtectedWalletSelector = SecretProtected(WalletSelector);

export { EtoSecretProtectedWalletSelector };
