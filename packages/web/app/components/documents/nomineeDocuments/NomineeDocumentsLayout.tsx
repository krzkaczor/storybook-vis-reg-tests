import * as React from "react";
import { FormattedMessage } from "react-intl-phraseapp";

import { Heading } from "../../shared/Heading";
import { DocumentList } from "../DocumentList";
import { documentTitles } from "../utils";
import { TComponentProps } from "./NomineeDocuments";

import * as styles from "../Documents.module.scss";

const NomineeDocumentsLayout: React.FunctionComponent<TComponentProps> = ({
  generateTemplate,
  etoTemplates,
  documentsGenerated,
}) => (
  <>
    <div data-test-id="eto-documents" className={styles.layout}>
      <Heading level={3} className={styles.header}>
        <FormattedMessage id="documents.nominee-legal-documents" />
      </Heading>

      <p className={styles.description}>
        <FormattedMessage id="documents.nominee-legal-documents.description" />
      </p>

      <section className={styles.documentSection}>
        <DocumentList
          generateTemplate={generateTemplate}
          etoTemplates={etoTemplates}
          documentsGenerated={documentsGenerated}
          documentTitles={documentTitles}
          fallbackText={
            <FormattedMessage id="documents.please-fill-the-eto-forms-in-order-to-generate-templates" />
          }
        />
      </section>
    </div>
  </>
);

export { NomineeDocumentsLayout };
