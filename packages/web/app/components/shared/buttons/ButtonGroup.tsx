import * as cn from "classnames";
import * as React from "react";

import { CommonHtmlProps } from "../../../types";

import * as styles from "./ButtonGroup.module.scss";

export enum EButtonGroupSize {
  NORMAL = styles.sizeNormal,
  SMALL = styles.sizeSmall,
}

export type TButtonGroupExternalProps = {
  size?: EButtonGroupSize;
};

const ButtonGroup: React.FunctionComponent<TButtonGroupExternalProps & CommonHtmlProps> = ({
  children,
  size,
  className,
}) => <section className={cn(styles.buttonGroup, size, className)}>{children}</section>;

ButtonGroup.defaultProps = {
  size: EButtonGroupSize.NORMAL,
};

export { ButtonGroup };
