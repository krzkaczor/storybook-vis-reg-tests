import * as React from "react";

import * as styles from "./StepCard.module.scss";

interface IStepCardProps {
  img: string;
  text: string | React.ReactNode;
}
export const StepCard: React.FunctionComponent<IStepCardProps> = ({ img, text }) => (
  <div className={styles.stepCard}>
    <img src={img} className={styles.stepCardImage} />
    <span className={styles.stepCardText}>{text}</span>
  </div>
);
