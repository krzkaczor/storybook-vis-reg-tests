import * as React from "react";

import { TTranslatedString } from "../../../types";

import * as styles from "./FormSection.module.scss";

interface IProps {
  title: TTranslatedString;
}

export const FormSection: React.FunctionComponent<IProps> = ({ title, children }) => (
  <section className={styles.formSection}>
    <h3 className={styles.title}>{title}</h3>
    <div>{children}</div>
  </section>
);
