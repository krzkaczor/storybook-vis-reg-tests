import * as React from "react";

import * as styles from "./TableCell.module.scss";

export interface ITableCell {
  children?: any;
  narrow?: boolean;
  center?: boolean;
  decorate?: boolean;
  mobileDescription?: string;
}

/**
 * @deprecated Use NewTable. Remove when we get rid of all usages.
 */
export const TableCell: React.FunctionComponent<ITableCell> = ({
  narrow,
  decorate,
  center,
  children,
  mobileDescription,
  ...props
}) => (
  <div
    {...props}
    className={`table-cell ${styles.tableCell} ${narrow ? styles.tableCellNarrow : ""} ${
      center ? styles.tableCellCenter : ""
    } ${decorate ? "decorate" : ""}`}
  >
    {mobileDescription && <span className={styles.mobileDescription}>{mobileDescription}</span>}
    <span className={styles.content}>{children}</span>
  </div>
);
