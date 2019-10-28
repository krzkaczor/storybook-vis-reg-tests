import { storiesOf } from "@storybook/react";
import { Formik } from "formik";
import * as React from "react";

import { FormDeprecated } from "../FormDeprecated";
import { FormFieldDate } from "./FormFieldDate";

storiesOf("forms/fields/FieldDate", module).add("default", () => (
  <Formik initialValues={{}} onSubmit={() => {}}>
    {() => (
      <FormDeprecated>
        <FormFieldDate label="Date of birth" name="dob" />
      </FormDeprecated>
    )}
  </Formik>
));
