import { Formik } from "formik";
import * as React from "react";

import { FormDeprecated } from "../FormDeprecated";

/**
 * Use only for testing and storybook.
 */
export const formWrapper = (formState: any, onSubmit?: (values: any) => any) => (
  Component: React.FunctionComponent,
) => () => (
  <Formik initialValues={formState} onSubmit={onSubmit || (() => {})}>
    {({ submitForm, values, submitCount }) => {
      if (process.env.STORYBOOK_RUN === "1") {
        // tslint:disable-next-line
        console.log(JSON.stringify(values));
      }

      return (
        <FormDeprecated>
          <Component />
          {onSubmit && (
            <button data-test-id="test-form-submit" onClick={submitForm}>
              Submit
            </button>
          )}
          <span data-test-id="test-form-submit-count">Submit count: {submitCount}</span>
        </FormDeprecated>
      );
    }}
  </Formik>
);
