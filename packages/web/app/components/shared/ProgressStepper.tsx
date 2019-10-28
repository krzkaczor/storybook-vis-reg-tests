import * as cn from "classnames";
import { range } from "lodash";
import * as React from "react";

import * as styles from "./ProgressStepper.module.scss";

export interface IProgressStepper {
  steps: number;
  currentStep: number;
}

export const ProgressStepper: React.FunctionComponent<IProgressStepper> = ({
  steps,
  currentStep,
}) => (
  <div className={styles.progressStepper}>
    {range(steps).map(number => (
      <div key={number} className={cn(styles.step, number < currentStep && styles.active)} />
    ))}
  </div>
);
