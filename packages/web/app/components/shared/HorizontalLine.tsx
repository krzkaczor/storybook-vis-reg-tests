import * as cn from "classnames";
import * as React from "react";

import { CommonHtmlProps } from "../../types";

import * as styles from "./HorizontalLine.module.scss";

type Size = "narrow" | "wide";
type TTheme = "yellow";

interface IHorizontalLineProps {
  size?: Size;
  theme?: TTheme;
}

export const HorizontalLine: React.FunctionComponent<IHorizontalLineProps & CommonHtmlProps> = ({
  className,
  size,
  theme,
}) => <div className={cn(styles.horizontalLine, className, size, theme)} />;

HorizontalLine.defaultProps = {
  size: "wide",
};
