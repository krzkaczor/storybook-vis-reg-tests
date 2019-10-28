import * as cn from "classnames";
import * as React from "react";

import { CommonHtmlProps, TDataTestId } from "../../../types";

import * as styles from "./Shared.module.scss";

export const Section: React.FunctionComponent<CommonHtmlProps & TDataTestId> = ({
  className,
  children,
  "data-test-id": dataTestId,
}) => (
  <section className={cn(styles.section, className)} data-test-id={dataTestId}>
    {children}
  </section>
);
