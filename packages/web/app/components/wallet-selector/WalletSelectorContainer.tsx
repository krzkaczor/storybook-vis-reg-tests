import * as React from "react";

import { TDataTestId } from "../../types";

import * as styles from "./WalletSelectorContainer.module.scss";

export const WalletSelectorContainer: React.FunctionComponent<TDataTestId> = ({
  children,
  "data-test-id": dataTestId,
}) => (
  <div data-test-id={dataTestId} className={styles.walletSelectorContainer}>
    {children}
  </div>
);
