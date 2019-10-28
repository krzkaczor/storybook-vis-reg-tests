import { Field, FieldProps, FormikConsumer } from "formik";
import * as React from "react";
import MaskedInput, { conformToMask, maskArray } from "react-text-mask";

import { InputLayout } from "../layouts/InputLayout";
import { isNonValid } from "./utils.unsafe";

type TExternalProps = {
  customValidation?: (value: string | undefined) => string | Function | Promise<void> | undefined;
  mask: maskArray;
  guided?: boolean;
};

type FormInputProps = TExternalProps & React.ComponentProps<typeof InputLayout>;

/**
 * Formik connected form input without FormGroup and FormFieldLabel.
 */
export class FormMaskedInput extends React.Component<FormInputProps> {
  render(): React.ReactNode {
    const {
      placeholder,
      name,
      prefix,
      suffix,
      className,
      addonStyle,
      errorMsg,
      size,
      disabled,
      customValidation,
      onBlur,
      ignoreTouched,
      mask,
      guided,
      maxLength,
      onChange,
      value,
      ...mainProps
    } = this.props;
    return (
      <FormikConsumer>
        {({ touched, errors, setFieldTouched, setFieldValue, submitCount }) => {
          const invalid = isNonValid(touched, errors, name, submitCount, ignoreTouched);

          return (
            <Field
              name={name}
              validate={customValidation}
              render={({ field }: FieldProps) => {
                const val = conformToMask(value ? String(value) : field.value, mask, {})
                  .conformedValue;

                return (
                  <MaskedInput
                    value={val}
                    placeholder={placeholder}
                    name={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      if (onChange) {
                        onChange(e);
                      }
                      setFieldTouched(name);
                      setFieldValue(name, e.target.value);
                    }}
                    mask={mask}
                    guide={guided}
                    render={(ref, props) => (
                      <InputLayout
                        innerRef={ref}
                        name={name}
                        placeholder={placeholder}
                        className={className}
                        addonStyle={addonStyle}
                        prefix={prefix}
                        suffix={suffix}
                        errorMsg={errorMsg}
                        size={size}
                        disabled={disabled}
                        maxLength={maxLength}
                        invalid={invalid}
                        onBlur={onBlur}
                        {...props}
                        {...mainProps}
                      />
                    )}
                  />
                );
              }}
            />
          );
        }}
      </FormikConsumer>
    );
  }
}
