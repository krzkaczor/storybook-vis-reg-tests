import * as cn from "classnames";
import * as React from "react";

import { TTranslatedString } from "../../../types";

import * as styles from "./FormHighlightGroup.module.scss";

interface IProps {
  title?: TTranslatedString | string;
  className?: string;
}

// TODO: Refactor to fieldset with legend as a title
export const FormHighlightGroup: React.FunctionComponent<IProps> = ({
  title,
  children,
  className,
}) => (
  <div className={cn(styles.formHighlightGroup, className)}>
    {title && <p>{title}</p>}
    {children}
  </div>
);
