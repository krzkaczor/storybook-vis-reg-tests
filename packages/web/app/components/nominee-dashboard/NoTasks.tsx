import * as React from "react";
import { FormattedMessage } from "react-intl-phraseapp";

import { SuccessTick } from "../shared/SuccessTick";

import * as styles from "./NomineeDashboard.module.scss";

export const NoTasks = () => (
  <section data-test-id="nominee-flow-no-tasks">
    <SuccessTick />
    <h2 className={styles.dashboardTitle}>
      <FormattedMessage id="nominee-dashboard.no-tasks-title" />
    </h2>
    <p className={styles.dashboardText}>
      <FormattedMessage id="nominee-dashboard.no-tasks-text" />
    </p>
  </section>
);
