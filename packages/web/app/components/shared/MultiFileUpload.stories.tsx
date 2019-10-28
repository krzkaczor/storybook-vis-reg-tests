import { storiesOf } from "@storybook/react";
import * as React from "react";

import { EKycRequestType } from "../../lib/api/kyc/KycApi.interfaces";
import { EMimeType } from "./forms/fields/utils.unsafe";
import { MultiFileUpload } from "./MultiFileUpload";

const files = [
  {
    id: "test id 1",
    fileName: "test file 1",
  },
  {
    id: "test id 2",
    fileName: "test file 2",
  },
];

storiesOf("Upload/MultiFileUpload", module)
  .add("individual", () => (
    <MultiFileUpload
      uploadType={EKycRequestType.INDIVIDUAL}
      acceptedFiles={[EMimeType.ANY_IMAGE_TYPE, EMimeType.PDF]}
      onDropFile={() => {}}
      files={[]}
      fileUploading={false}
      layout="vertical"
    />
  ))
  .add("business layout: vertical", () => (
    <MultiFileUpload
      uploadType={EKycRequestType.BUSINESS}
      acceptedFiles={[EMimeType.ANY_IMAGE_TYPE, EMimeType.PDF]}
      onDropFile={() => {}}
      files={[]}
      layout="vertical"
      fileUploading={false}
    />
  ))
  .add("business layout: horizontal", () => (
    <MultiFileUpload
      uploadType={EKycRequestType.BUSINESS}
      acceptedFiles={[EMimeType.ANY_IMAGE_TYPE, EMimeType.PDF]}
      onDropFile={() => {}}
      files={[]}
      layout="horizontal"
      fileUploading={false}
    />
  ))
  .add("business state: uploading", () => (
    <MultiFileUpload
      uploadType={EKycRequestType.BUSINESS}
      acceptedFiles={[EMimeType.ANY_IMAGE_TYPE, EMimeType.PDF]}
      onDropFile={() => {}}
      files={[]}
      fileUploading={true}
    />
  ))
  .add("business state: with files", () => (
    <MultiFileUpload
      uploadType={EKycRequestType.BUSINESS}
      acceptedFiles={[EMimeType.ANY_IMAGE_TYPE, EMimeType.PDF]}
      onDropFile={() => {}}
      files={files}
      fileUploading={false}
    />
  ));
