import * as React from "react";
import { FormattedMessage } from "react-intl-phraseapp";

import * as styles from "./PayoutWidget.module.scss";

export const WelcomeToNeufund: React.FunctionComponent<{}> = () => (
  <div className={styles.main} data-test-id="my-portfolio-widget-welcome">
    <h3 className={styles.welcome}>
      <FormattedMessage id="dashboard.my-portfolio-widget.welcome" />
    </h3>
    <p>
      <FormattedMessage id="dashboard.my-portfolio-widget.explanation" />
    </p>
  </div>
);
