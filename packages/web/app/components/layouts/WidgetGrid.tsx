import * as cn from "classnames";
import * as React from "react";

import { TDataTestId } from "../../types";

import * as styles from "./WidgetGrid.module.scss";

export const WidgetGrid: React.FunctionComponent<{ className?: string } & TDataTestId> = ({
  children,
  className,
  "data-test-id": dataTestId,
}) => (
  <div className={cn(styles.widgetLayout, className)} data-test-id={dataTestId}>
    {children}
  </div>
);
