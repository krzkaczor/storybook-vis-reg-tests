import * as React from "react";

import { TTranslatedString } from "../../types";

import * as styles from "./NomineeDashboard.module.scss";

interface IDashboardTitleProps {
  title: TTranslatedString;
  text: TTranslatedString;
}

export const DashboardTitle: React.FunctionComponent<IDashboardTitleProps> = ({ title, text }) => (
  <div className={styles.dashboardTitleWrapper}>
    <h1 className={styles.dashboardTitle}>{title}</h1>
    <p className={styles.dashboardText}>{text}</p>
  </div>
);
