import * as React from "react";

import * as styles from "./TableHeader.module.scss";

interface ITableHeaderProps {
  children: React.ReactNode;
  mobileAction?: () => void;
  mobileActionName?: string;
}

/**
 * @deprecated Use NewTable. Remove when we get rid of all usages.
 */
export const TableHeader: React.FunctionComponent<ITableHeaderProps> = ({
  children,
  mobileAction,
  mobileActionName,
}) => (
  <div className={styles.tableHeader}>
    {mobileAction && mobileActionName && (
      <span className={styles.action} onClick={mobileAction}>
        {mobileActionName}
      </span>
    )}
    <div className={styles.content}>{children}</div>
  </div>
);
