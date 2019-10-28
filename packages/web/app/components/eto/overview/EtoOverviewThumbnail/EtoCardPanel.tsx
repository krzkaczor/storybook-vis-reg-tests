import * as cn from "classnames";
import * as React from "react";

import { TDataTestId } from "../../../../types";
import { Panel } from "../../../shared/Panel";

import * as styles from "./EtoCardPanel.module.scss";

interface IBaseProps {
  onClick: () => void;
}

export const EtoCardPanelButton: React.FunctionComponent<IBaseProps & TDataTestId> = ({
  children,
  onClick,
  "data-test-id": dataTestId,
}) => (
  <button className={cn(styles.etoCardPanelIsButton, styles.etoCardPanel)} onClick={onClick}>
    <Panel data-test-id={dataTestId}>{children}</Panel>
  </button>
);

export const EtoCardButton: React.FunctionComponent<IBaseProps & TDataTestId> = ({
  children,
  onClick,
  "data-test-id": dataTestId,
}) => (
  <button className={styles.etoCardPanelIsButton} onClick={onClick}>
    <Panel data-test-id={dataTestId}>{children}</Panel>
  </button>
);

export const EtoCardPanel: React.FunctionComponent<TDataTestId> = ({
  children,
  "data-test-id": dataTestId,
}) => (
  <Panel className={styles.etoCardPanel} data-test-id={dataTestId}>
    {children}
  </Panel>
);
