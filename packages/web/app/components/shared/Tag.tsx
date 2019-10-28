import * as cn from "classnames";
import * as React from "react";

import { TDataTestId, TTranslatedString, XOR } from "../../types";
import { InlineIcon } from "./icons";
import { ExternalLink } from "./links/ExternalLink";

import * as styles from "./Tag.module.scss";

type TTheme = "dark" | "green" | "white" | "default" | "silver";
type TLayout = "ghost" | "ghost-bold" | "bold";

export enum ETagSize {
  SMALL = styles.small,
  TINY = styles.tiny,
}

type TLinkTag = {
  to?: string;
};

type TButtonTag = {
  onClick?: (e: React.MouseEvent) => void;
};

type TTagCommon = {
  text: TTranslatedString;
  layout?: TLayout;
  size?: ETagSize;
  theme?: TTheme;
  className?: string;
  svgIcon?: string;
  placeSvgInEnd?: boolean;
};

export type TTag = TTagCommon & XOR<TLinkTag, TButtonTag>;

type TTagWithFallback = {
  condition: boolean;
  textElement: TTranslatedString;
  innerClass?: string;
} & XOR<TLinkTag, TButtonTag>;

export const TagWithFallback: React.FunctionComponent<TTagWithFallback & TDataTestId> = ({
  condition,
  to,
  textElement,
  innerClass,
  onClick,
  "data-test-id": dataTestId,
}) => {
  const commonProps = {
    "data-test-id": dataTestId,
    size: ETagSize.TINY,
    layout: "ghost" as const,
    text: textElement,
    className: innerClass,
  };

  if (condition) {
    if (onClick) {
      return <Tag onClick={onClick} theme="green" {...commonProps} />;
    } else {
      return <Tag to={to} theme="green" {...commonProps} />;
    }
  } else {
    return <Tag {...commonProps} theme="silver" />;
  }
};

export const Tag: React.FunctionComponent<TTag & TDataTestId> = ({
  text,
  to,
  layout,
  size,
  theme,
  className,
  onClick,
  svgIcon,
  placeSvgInEnd,
  "data-test-id": dataTestId,
}) => {
  const classes = cn(styles.tag, layout, size, theme, className);

  const tagContent = (
    <>
      {!placeSvgInEnd && !!svgIcon && <InlineIcon svgIcon={svgIcon} />}
      {text}
      {placeSvgInEnd && !!svgIcon && <InlineIcon svgIcon={svgIcon} className="ml-2" />}
    </>
  );

  if (to) {
    return (
      <ExternalLink className={classes} href={to} data-test-id={dataTestId}>
        {tagContent}
      </ExternalLink>
    );
  }

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={cn(classes, styles.tagAsButton)}
        data-test-id={dataTestId}
      >
        {tagContent}
      </button>
    );
  }

  return (
    <span data-test-id={`${dataTestId} tag.non-clickable`} className={classes}>
      {tagContent}
    </span>
  );
};
