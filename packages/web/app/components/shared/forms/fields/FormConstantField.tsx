import * as cn from "classnames";
import * as React from "react";

import { TTranslatedString } from "../../../../types";
import { FormError } from "./FormFieldError";

import * as styles from "./FormConstantField.module.scss";

interface IProps {
  value: string;
  className?: string;
  errorMessage?: TTranslatedString;
}

export const FormConstantField: React.FunctionComponent<IProps> = ({
  value,
  className,
  errorMessage,
  ...props
}) => (
  <div className={cn(styles.valueWrapper, className)} {...props}>
    {value}
    {errorMessage && <FormError message={errorMessage} className={styles.error} />}
  </div>
);
