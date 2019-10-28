import * as cn from "classnames";
import * as React from "react";
import { FormattedMessage } from "react-intl-phraseapp";

import { IKycFileInfo } from "../../lib/api/kyc/KycApi.interfaces";

import * as confirmIcon from "../../assets/img/notifications/success.svg";
import * as styles from "./UploadedFiles.module.scss";

interface IProps {
  files: ReadonlyArray<IKycFileInfo>;
}

export const UploadedFiles: React.FunctionComponent<IProps> = ({ files }) => (
  <div className={cn("c-uploaded-files", styles.uploadedFiles)}>
    <h6>
      {" "}
      <FormattedMessage id="shared-component.uploaded-files.title" />
    </h6>
    {files.map(({ fileName }, index) => (
      <div data-test-id={`multi-file-upload-file-${fileName}`} key={index} className={styles.file}>
        <span className={styles.text} title={fileName}>
          {fileName}
        </span>
        <img src={confirmIcon} className={styles.icon} />
      </div>
    ))}
    <br />
  </div>
);
