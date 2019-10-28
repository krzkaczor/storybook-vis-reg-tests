import * as cn from "classnames";
import * as React from "react";

import { CommonHtmlProps } from "../../types";

import * as styles from "./Confetti.module.scss";

export enum EConfettiTheme {
  COLORFUL = styles.themeColorful,
  GREEN = styles.themeGreen,
}

export enum EConfettiSize {
  NORMAL = styles.sizeNormal,
  SMALL = styles.sizeSmall,
}

type TProps = {
  theme?: EConfettiTheme;
  size?: EConfettiSize;
};

export const Confetti: React.FunctionComponent<CommonHtmlProps & TProps> = ({
  className,
  style,
  children,
  theme,
  size,
}) => (
  <div className={cn(styles.wrapper, className, theme, size)} style={style}>
    {children}
    <div className={cn(styles.cannon)}>
      <div className={cn(styles.path, styles.pathSm, styles.pathAngleM2)}>
        <div className={cn(styles.confetti, styles.confettiFlake, styles.confettiColor3)} />
        <div className={cn(styles.confetti, styles.confettiRibbon, styles.confettiColor1)} />
        <div className={cn(styles.confetti, styles.confettiRibbon, styles.confettiColor2)} />
        <div className={cn(styles.confetti, styles.confettiFlake, styles.confettiColor1)} />
        <div className={cn(styles.confettiSpacer)} />
      </div>
      <div className={cn(styles.path, styles.pathMd, styles.pathAngleM1)}>
        <div className={cn(styles.confetti, styles.confettiRibbon, styles.confettiColor2)} />
        <div className={cn(styles.confetti, styles.confettiFlake, styles.confettiColor2)} />
        <div className={cn(styles.confetti, styles.confettiFlake, styles.confettiColor3)} />
        <div className={cn(styles.confetti, styles.confettiRibbon, styles.confettiColor1)} />
        <div className={cn(styles.confetti, styles.confettiFlake, styles.confettiColor4)} />
        <div className={cn(styles.confettiSpacer)} />
      </div>
      <div className={cn(styles.path, styles.pathLg, styles.pathAngle0)}>
        <div className={cn(styles.confetti, styles.confettiRibbon, styles.confettiColor1)} />
        <div className={cn(styles.confetti, styles.confettiRibbon, styles.confettiColor4)} />
        <div className={cn(styles.confetti, styles.confettiRibbon, styles.confettiColor2)} />
        <div className={cn(styles.confetti, styles.confettiFlake, styles.confettiColor3)} />
        <div className={cn(styles.confettiSpacer)} />
      </div>
      <div className={cn(styles.path, styles.pathMd, styles.pathAngle1)}>
        <div className={cn(styles.confetti, styles.confettiFlake, styles.confettiColor3)} />
        <div className={cn(styles.confetti, styles.confettiRibbon, styles.confettiColor1)} />
        <div className={cn(styles.confetti, styles.confettiRibbon, styles.confettiColor4)} />
        <div className={cn(styles.confetti, styles.confettiFlake, styles.confettiColor3)} />
        <div className={cn(styles.confetti, styles.confettiRibbon, styles.confettiColor2)} />
        <div className={cn(styles.confettiSpacer)} />
      </div>
      <div className={cn(styles.path, styles.pathSm, styles.pathAngle2)}>
        <div className={cn(styles.confetti, styles.confettiRibbon, styles.confettiColor2)} />
        <div className={cn(styles.confetti, styles.confettiFlake, styles.confettiColor3)} />
        <div className={cn(styles.confetti, styles.confettiFlake, styles.confettiColor4)} />
        <div className={cn(styles.confetti, styles.confettiRibbon, styles.confettiColor1)} />
        <div className={cn(styles.confettiSpacer)} />
      </div>
    </div>
  </div>
);

Confetti.defaultProps = {
  theme: EConfettiTheme.COLORFUL,
  size: EConfettiSize.NORMAL,
};
