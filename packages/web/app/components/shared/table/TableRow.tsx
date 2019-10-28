import * as React from "react";

import * as styles from "./TableRow.module.scss";

export interface ITableRow {
  children?: React.ReactNode;
}

/**
 * @deprecated Use NewTable. Remove when we get rid of all usages.
 */
export const TableRow: React.FunctionComponent<ITableRow> = ({ children }) => (
  <div className={`table-row ${styles.tableRow}`}>{children}</div>
);
