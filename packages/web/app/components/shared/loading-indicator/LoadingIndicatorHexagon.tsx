import * as cn from "classnames";
import { times } from "lodash/fp";
import * as React from "react";

import * as styles from "./LoadingIndicatorHexagon.module.scss";

type THexBrickExternalProps = {
  c: string;
  r?: string;
};

const HexBrick: React.FunctionComponent<THexBrickExternalProps> = ({ c, r }) => (
  <div className={cn(styles.gel, c, r)}>
    <div className={cn(styles.hexBrick, styles.h1)} />
    <div className={cn(styles.hexBrick, styles.h2)} />
    <div className={cn(styles.hexBrick, styles.h3)} />
  </div>
);

const LoadingIndicatorHexagon: React.FunctionComponent = () => (
  <div className={styles.socket}>
    <HexBrick c={styles.centerGel} />

    {times(
      n => (
        <HexBrick key={n} c={styles[`c${n + 1}`]} r={styles.r1} />
      ),
      6,
    )}

    {times(
      n => (
        <HexBrick key={n} c={styles[`c${n + 7}`]} r={styles.r2} />
      ),
      12,
    )}

    {times(
      n => (
        <HexBrick key={n} c={styles[`c${n + 19}`]} r={styles.r3} />
      ),
      18,
    )}
  </div>
);

export { LoadingIndicatorHexagon };
