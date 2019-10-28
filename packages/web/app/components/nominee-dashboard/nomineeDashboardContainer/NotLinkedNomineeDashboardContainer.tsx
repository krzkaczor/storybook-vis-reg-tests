import * as React from "react";

import * as styles from "../NomineeDashboard.module.scss";

const NotLinkedNomineeDashboardContainer: React.FunctionComponent = ({ children }) => (
  <div data-test-id="nominee-dashboard" className={styles.nomineeDashboardContainer}>
    {children}
  </div>
);
export { NotLinkedNomineeDashboardContainer };
