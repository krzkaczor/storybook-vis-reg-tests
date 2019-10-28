import { connect as formikConnect, Field, FieldProps, getIn } from "formik";
import { includes } from "lodash";
import * as React from "react";
import { compose } from "recompose";

import { TFormikConnect } from "../../../../types";
import { CheckboxLayout } from "../layouts/CheckboxLayout";
import { IFormField, withFormField } from "./utils.unsafe";

interface IFormFieldCheckboxGroupProps {
  name: string;
}

interface IFormFieldCheckboxProps {
  value: string;
  label: string;
  disabled?: boolean;
}

const toggle = (values: string[], valueToToggle: string): string[] => {
  const alreadyExists = includes(values, valueToToggle);

  if (alreadyExists) {
    return values.filter(v => v !== valueToToggle);
  } else {
    return [...values, valueToToggle];
  }
};

const FormFieldNameContext = React.createContext("FORM FIELD UNKNOWN");

class FormFieldCheckbox extends React.Component<IFormFieldCheckboxProps> {
  render(): React.ReactNode {
    const { value, label, disabled, ...restProps } = this.props;

    return (
      <FormFieldNameContext.Consumer>
        {fieldName => (
          <Field
            name={fieldName}
            render={({ field, form }: FieldProps) => (
              <CheckboxLayout
                {...restProps}
                name={fieldName}
                disabled={disabled}
                label={label}
                value={value}
                checked={includes(field.value, value)}
                onChange={() => form.setFieldValue(fieldName, toggle(field.value, value))}
              />
            )}
          />
        )}
      </FormFieldNameContext.Consumer>
    );
  }
}

class FormFieldCheckboxGroupLayout extends React.Component<
  IFormFieldCheckboxGroupProps & TFormikConnect
> {
  constructor(props: IFormFieldCheckboxGroupProps & TFormikConnect) {
    super(props);
    this.setDefaultValueIfNeeded();
  }

  private setDefaultValueIfNeeded(): void {
    const { name, formik } = this.props;
    const { setFieldValue, values } = formik;
    const value = getIn(values, name);

    if (value === undefined) {
      setFieldValue(this.props.name, []);
    }
  }

  render(): React.ReactNode {
    const { name, children } = this.props;

    return (
      <FormFieldNameContext.Provider value={name}>
        <div>{children}</div>
      </FormFieldNameContext.Provider>
    );
  }
}

const FormFieldCheckboxGroup = compose<IFormFieldCheckboxGroupProps & TFormikConnect, IFormField>(
  withFormField,
  formikConnect,
)(FormFieldCheckboxGroupLayout);

export { FormFieldCheckbox, FormFieldCheckboxGroup, IFormFieldCheckboxGroupProps };
