import * as cn from "classnames";
import * as React from "react";
import Blockies from "react-blockies";

import { CommonHtmlProps } from "../../types";

import * as styles from "./Avatar.module.scss";

interface IProps {
  seed: string;
}

export const Avatar: React.FunctionComponent<IProps & CommonHtmlProps> = ({
  seed,
  className,
  style,
}) => (
  <div className={cn(styles.avatar, className)} style={style}>
    <Blockies seed={seed} />
  </div>
);
