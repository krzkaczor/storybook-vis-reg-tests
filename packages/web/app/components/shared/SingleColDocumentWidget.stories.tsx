import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import * as React from "react";

import { EEtoDocumentType, IEtoDocument } from "../../lib/api/eto/EtoFileApi.interfaces";
import { EOfferingDocumentType } from "../../lib/api/eto/EtoProductsApi.interfaces";
import { SingleColDocumentsLayout } from "./SingleColDocumentWidget";

const documents: IEtoDocument[] = [
  {
    documentType: "company_token_holder_agreement" as EEtoDocumentType,
    form: "template",
    ipfsHash: "QmNM2rN6fi9TTjnB3pkFUb6MsAYxxbHjL4n5Fs5zxeb5Eq",
    mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    name: "company_token_holder_agreement",
  },
  {
    documentType: "investment_and_shareholder_agreement" as EEtoDocumentType,
    form: "template",
    ipfsHash: "QmRkGwa5UsobQ7ispn3UaKFU6Fv5iJkLf3Y4rmyrhqPUGy",
    mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    name: "investment_and_shareholder_agreement",
  },
  {
    documentType: "prospectus_template" as EEtoDocumentType,
    form: "template",
    ipfsHash: "QmQYWyx6WWwCYqBnJ74ruogTTHfKoscQRHU5eJFKDD22mT",
    mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    name: "prospectus_template_de",
  },
  {
    documentType: "reservation_and_acquisition_agreement" as EEtoDocumentType,
    form: "template",
    ipfsHash: "QmUrCYBhQCpfRyVqgWEVUCV9vTextCPaAq28ZyNNJ8CBXY",
    mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    name: "reservation_and_acquisition_agreement",
  },
  {
    documentType: "termsheet_template" as EEtoDocumentType,
    form: "template",
    ipfsHash: "QmRLwyTw4ux84KnYvhejTsUggi2SeewGqASuh3DrURtyot",
    mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    name: "termsheet_template",
  },
];

storiesOf("Document/SingleColDocumentWidget", module)
  .add("default", () => (
    <SingleColDocumentsLayout
      title="fufu"
      documents={documents}
      offeringDocumentType={EOfferingDocumentType.MEMORANDUM}
      downloadImmutableFile={action("downloadImmutableFile")}
    />
  ))
  .add("Retail ETO", () => (
    <SingleColDocumentsLayout
      title="fufu"
      documents={documents}
      offeringDocumentType={EOfferingDocumentType.PROSPECTUS}
      downloadImmutableFile={action("downloadImmutableFile")}
    />
  ));
