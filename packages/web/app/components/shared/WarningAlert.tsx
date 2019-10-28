import * as cn from "classnames";
import * as React from "react";

import { TDataTestId } from "../../types";

import * as styles from "./WarningAlert.module.scss";

interface IWarningAlertProps {
  className?: string;
}

export const WarningAlert: React.FunctionComponent<IWarningAlertProps & TDataTestId> = ({
  children,
  className,
  "data-test-id": dataTestId,
}) => (
  <div className={cn(styles.warningAlert, className)}>
    <span data-test-id={dataTestId}>
      <i className={cn("fa fa-exclamation-circle mr-2", styles.icon)} aria-hidden="true" />
      {children}
    </span>
  </div>
);
