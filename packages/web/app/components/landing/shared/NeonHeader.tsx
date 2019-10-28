import * as cn from "classnames";
import * as React from "react";

import { TTranslatedString } from "../../../types";

import * as styles from "./NeonHeader.module.scss";

enum ENeonHeaderSize {
  NORMAL = styles.neonHeaderWrapperNormal,
  BIG = styles.neonHeaderWrapperBig,
}

interface IExternalProps {
  children: TTranslatedString;
  size?: ENeonHeaderSize;
}

const NeonHeader: React.FunctionComponent<IExternalProps> = ({ children, size }) => (
  <header className={cn(styles.neonHeaderWrapper, size)}>
    <div className={styles.neon} />
    <h1 className={styles.neonHeader}>{children}</h1>
  </header>
);

NeonHeader.defaultProps = {
  size: ENeonHeaderSize.NORMAL,
};

export { NeonHeader, ENeonHeaderSize };
