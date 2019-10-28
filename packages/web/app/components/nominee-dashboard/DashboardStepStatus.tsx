import * as React from "react";

import { TTranslatedString } from "../../types";

import * as styles from "./NomineeDashboard.module.scss";

interface IStepStatus {
  contentTitleComponent: React.ReactChild;
  contentTextComponent?: React.ReactChild | React.ReactChild[];
  status: TTranslatedString;
  mainComponent?: React.ReactChild;
}

const header = (contentTitleComponent: React.ReactChild, status: TTranslatedString) => (
  <h1 className={styles.dashboardContentTitle}>
    {contentTitleComponent}
    {status && (
      <>
        {" "}
        <span className={styles.status}>{status}</span>
      </>
    )}
  </h1>
);

const text = (textComponents: React.ReactChild | React.ReactChild[]) => {
  if (Array.isArray(textComponents)) {
    return textComponents.map((component, i) => (
      <p className={styles.dashboardContentText} key={i}>
        {component}
      </p>
    ));
  } else {
    return <p className={styles.dashboardContentText}>{textComponents}</p>;
  }
};

export const StepStatus: React.FunctionComponent<IStepStatus> = ({
  contentTitleComponent,
  contentTextComponent,
  status,
  mainComponent,
}) => (
  <>
    <>
      {contentTitleComponent && header(contentTitleComponent, status)}
      {contentTextComponent && text(contentTextComponent)}
      {mainComponent}
    </>
  </>
);
