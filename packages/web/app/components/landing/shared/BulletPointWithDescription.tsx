import * as React from "react";

import * as styles from "./BulletPointWithDescription.module.scss";

interface IProps {
  index: number;
  header: string | React.ReactNode;
  description: string | React.ReactNode;
}

export const BulletPointWithDescription: React.FunctionComponent<IProps> = ({
  index,
  header,
  description,
}) => (
  <div className={styles.bulletPointWithDescription}>
    <div className={styles.bullet}>{index}</div>
    <div className={styles.divider} />
    <div>
      <h4 className={styles.header}>{header}</h4>
      <p className={styles.description}>{description}</p>
    </div>
  </div>
);
