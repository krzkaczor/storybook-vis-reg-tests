import * as cn from "classnames";
import * as React from "react";

import { TTranslatedString } from "../../types";
import { ProgressStepper } from "./ProgressStepper";

import * as styles from "./HeaderProgressStepper.module.scss";

interface IProps {
  steps: number;
  currentStep: number;
  headerText: TTranslatedString;
  descText?: TTranslatedString;
  warning?: boolean;
  headerClassName?: string;
}

export const HeaderProgressStepper: React.FunctionComponent<IProps> = props => (
  <>
    <ProgressStepper steps={props.steps} currentStep={props.currentStep} />
    <h2 className={cn(styles.title, { "text-warning": props.warning }, props.headerClassName)}>
      {props.headerText}
    </h2>
    {props.descText && <p className={styles.description}>{props.descText}</p>}
  </>
);
