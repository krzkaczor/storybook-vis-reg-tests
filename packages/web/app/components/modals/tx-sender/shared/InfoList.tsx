import * as cn from "classnames";
import * as React from "react";
import { ListGroup } from "reactstrap";

import { CommonHtmlProps } from "../../../../types";

import * as styles from "./InfoList.module.scss";

export const InfoList: React.FunctionComponent<CommonHtmlProps> = ({ children, className }) => (
  <ListGroup className={cn(styles.infoList, "pure", className)}>{children}</ListGroup>
);
