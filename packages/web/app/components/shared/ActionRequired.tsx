import * as cn from "classnames";
import * as React from "react";

import * as styles from "./ActionRequired.module.scss";

export enum EActionRequiredPosition {
  TOP = styles.positionTop,
  BOTTOM = styles.positionBottom,
}

interface IExternalProps {
  active: boolean;
  position?: EActionRequiredPosition;
}

const ActionRequired: React.FunctionComponent<IExternalProps> = ({
  position,
  active,
  children,
}) => (
  <span className={cn(styles.actionRequired, position, { [styles.actionRequiredActive]: active })}>
    {children}
  </span>
);

ActionRequired.defaultProps = {
  position: EActionRequiredPosition.TOP,
};

export { ActionRequired };
