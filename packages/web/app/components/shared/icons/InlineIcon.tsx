import * as cn from "classnames";
import * as React from "react";

import { TTranslatedString } from "../../../types";

import * as styles from "./InlineIcon.module.scss";

interface IProps {
  svgIcon: string;
  width?: string;
  height?: string;
  className?: string;
  onClick?: () => void;
  alt?: TTranslatedString;
}

export const InlineIcon: React.FunctionComponent<IProps> = ({
  className = cn("inline-icon", styles.inlineIcon),
  svgIcon,
  width,
  height,
  alt,
  ...props
}) => (
  <>
    <span
      className={className}
      style={{ width, height }}
      dangerouslySetInnerHTML={{ __html: svgIcon }}
      {...props}
    />
    {alt && <span className="sr-only">{alt}</span>}
  </>
);
