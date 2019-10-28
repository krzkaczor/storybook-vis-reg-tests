import * as cn from "classnames";
import * as React from "react";

import { CommonHtmlProps } from "../../../types";

import * as styles from "./EthereumIcon.module.scss";

export enum EEthereumIconSize {
  NORMAL = styles.sizeNormal,
  SMALL = styles.sizeSmall,
}

export enum EEthereumIconTheme {
  GREEN = styles.themeGreen,
  SILVER = styles.themeSilver,
}

interface IExternalProps {
  size?: EEthereumIconSize;
  theme?: EEthereumIconTheme;
  spinning?: boolean;
}

export const EthereumIcon: React.FunctionComponent<IExternalProps & CommonHtmlProps> = ({
  className,
  style,
  size,
  spinning,
  theme,
}) => (
  <div
    className={cn(styles.wrapper, size, theme, className, { [styles.spinning]: spinning })}
    style={style}
  >
    <div className={styles.eth}>
      <div className={styles.bottom}>
        <div className={styles.left} />
        <div className={styles.right} />
        <div className={styles.up} />
        <div className={styles.down} />
      </div>

      <div className={styles.top}>
        <div className={styles.left} />
        <div className={styles.right} />
        <div className={styles.up} />
        <div className={styles.down} />
      </div>
    </div>
  </div>
);

EthereumIcon.defaultProps = {
  size: EEthereumIconSize.NORMAL,
  theme: EEthereumIconTheme.GREEN,
  spinning: true,
};
