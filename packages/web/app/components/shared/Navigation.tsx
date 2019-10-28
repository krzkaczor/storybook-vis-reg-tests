import * as cn from "classnames";
import * as React from "react";

import { Dictionary } from "../../types";

import * as styles from "./Navigation.module.scss";

interface INavigation {
  text: string;
  forward: boolean;
  className?: string;
}

interface INavigationButton {
  onClick: () => void;
  disabled?: boolean;
}

/**
 * @deprecated Should be replaced by Button
 */
export const NavigationButton: React.FunctionComponent<INavigation & INavigationButton> = ({
  text,
  forward,
  className,
  onClick,
  disabled,
}) => {
  const props: Dictionary<unknown> = {
    className: cn(
      className,
      styles.container,
      disabled && styles.disabled,
      forward ? styles.right : styles.left,
    ),
  };

  if (!disabled) {
    props.onClick = onClick;
  } else {
    props.tabIndex = -1;
  }

  return (
    <span tabIndex={0} {...props}>
      {!forward && <i className={"fa fa-chevron-left mr-2"} aria-hidden="true" />}
      {text}
      {forward && <i className={"fa fa-chevron-right ml-2"} aria-hidden="true" />}
    </span>
  );
};
