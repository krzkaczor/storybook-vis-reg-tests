import * as React from "react";
import { Schema } from "yup";

import { isWysiwyg } from "./forms/fields/utils.unsafe";
import { SanitizedHtml } from "./SanitizedHtml";

import * as styles from "./Field.module.scss";

type TProps = {
  name: string;
  value: string;
  schema?: Schema<unknown>;
};

const FieldSchemaContext = React.createContext<Schema<unknown> | undefined>(undefined);

const FieldSchemaProvider = FieldSchemaContext.Provider;

const Field: React.FunctionComponent<TProps> = ({ name, value, schema }) => {
  const schemaFromContext = React.useContext(FieldSchemaContext);

  // prefer schema if provided over one from context
  schema = schema || schemaFromContext;

  if (schema) {
    const renderHtml = isWysiwyg(schema, name);

    // Only render html when needed to not add performance/security overhead
    if (renderHtml) {
      return <SanitizedHtml className={styles.richField} unsafeHtml={value} />;
    }
  }

  return <>{value}</>;
};

export { Field, FieldSchemaProvider };
