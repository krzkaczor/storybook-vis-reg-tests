import * as cn from "classnames";
import * as React from "react";

import * as styles from "./Proportion.module.scss";

interface IProps {
  height?: number;
  width?: number;
  className?: string;
  onClick?: () => void;
  dataTestId?: string;
}

export const Proportion: React.FunctionComponent<IProps> = ({
  width = 1,
  height = 1,
  children,
  className,
  onClick,
  dataTestId,
}) => {
  if (onClick === undefined) {
    return (
      <div
        className={cn(styles.proportion, className)}
        style={{ paddingTop: `${(height / width) * 100}%` }}
      >
        <div className={styles.content}>{children}</div>
      </div>
    );
  } else {
    return (
      <button onClick={onClick} className={styles.clickableArea} data-test-id={dataTestId}>
        <span
          className={cn(styles.proportion, className)}
          style={{ paddingTop: `${(height / width) * 100}%` }}
        >
          <div className={styles.content}>{children}</div>
        </span>
      </button>
    );
  }
};
