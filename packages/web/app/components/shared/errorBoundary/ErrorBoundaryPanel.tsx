import * as React from "react";
import { FormattedMessage } from "react-intl-phraseapp";

import { Panel } from "../Panel";

import * as styles from "./ErrorBoundary.module.scss";

export const ErrorBoundaryPanel: React.FunctionComponent = () => (
  <Panel className={styles.panel}>
    <p className="mb-0">
      <FormattedMessage id="error-boundary.widget-error-message" />
    </p>
  </Panel>
);
