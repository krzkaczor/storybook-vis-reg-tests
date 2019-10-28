import * as React from "react";

import * as styles from "../NomineeDashboard.module.scss";

const AccountSetupContainer: React.FunctionComponent = ({ children }) => (
  <div data-test-id="nominee-dashboard" className={styles.accountSetupWrapper}>
    {children}
  </div>
);
export { AccountSetupContainer };
