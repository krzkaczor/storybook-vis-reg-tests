import * as cn from "classnames";
import * as React from "react";

import { CommonHtmlProps, TDataTestId } from "../../../../types";

import * as styles from "./CheckboxLayout.module.scss";

export enum ECheckboxLayout {
  INLINE = styles.layoutInline,
  BLOCK = styles.layoutBlock,
}

interface IProps {
  layout?: ECheckboxLayout;
  inputId?: string;
  name: string;
  label?: string | React.ReactNode;
  value?: string;
  checked?: boolean;
  disabled?: boolean;
  inputRef?: (el: HTMLInputElement | null) => void;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const CheckboxLayout: React.FunctionComponent<IProps & TDataTestId & CommonHtmlProps> = ({
  className,
  layout,
  name,
  label,
  value = "true",
  onChange,
  checked,
  disabled,
  inputId,
  inputRef,
  "data-test-id": dataTestId,
}) => (
  <label className={cn(styles.checkbox, layout, className)}>
    <input
      id={inputId}
      className={styles.input}
      onChange={onChange}
      type="checkbox"
      name={name}
      value={value}
      checked={checked}
      data-test-id={dataTestId}
      disabled={disabled}
      ref={inputRef}
    />
    <div className={cn(styles.indicator, disabled && styles.disabled)} />
    {label && <div className={styles.label}>{label}</div>}
  </label>
);

CheckboxLayout.defaultProps = {
  layout: ECheckboxLayout.INLINE,
};

const RadioButtonLayout: React.FunctionComponent<IProps & TDataTestId & CommonHtmlProps> = ({
  className,
  layout,
  name,
  label,
  value = "true",
  onChange,
  checked,
  disabled,
  inputRef,
  "data-test-id": dataTestId,
}) => (
  <label className={cn(styles.checkbox, layout, className)}>
    <input
      className={styles.input}
      disabled={disabled}
      onChange={onChange}
      type="radio"
      name={name}
      value={value}
      defaultChecked={checked}
      data-test-id={dataTestId}
      ref={inputRef}
    />
    <div className={cn(styles.indicator, disabled && styles.disabled)} />
    {label && <div className={styles.label}>{label}</div>}
  </label>
);

RadioButtonLayout.defaultProps = {
  layout: ECheckboxLayout.INLINE,
};

export { RadioButtonLayout, CheckboxLayout };
