import * as React from "react";
import { FormattedHTMLMessage } from "react-intl-phraseapp";

import { HorizontalLine } from "../../shared/HorizontalLine";
import { InlineIcon } from "../../shared/icons";

import * as arrowHead from "../../../assets/img/inline_icons/arrowhead.svg";
import * as styles from "./OffToOnChainCompany.module.scss";

interface IStepProps {
  title: string;
  description: string;
}

interface IProps {
  steps: IStepProps[];
}

export const OffToOnCompany: React.FunctionComponent<IProps> = ({ steps }) => (
  <div className={styles.offToOnChainCompany}>
    <h3 className={styles.header}>
      <FormattedHTMLMessage tagName="span" id="off-to-on-chain.header" />
    </h3>
    <HorizontalLine theme="yellow" size="narrow" />
    <div className={styles.steps}>
      {steps.map(({ title, description }, index) => (
        <div className={styles.step} key={index}>
          <h4 className={styles.stepName}>{title}</h4>
          <div className={styles.stepCount}>
            <div className={styles.counter}>{index + 1}</div>
          </div>
          <p className={styles.stepDescription}>{description}</p>
        </div>
      ))}
      <InlineIcon svgIcon={arrowHead} />
    </div>
    <h3 className={styles.header}>
      <FormattedHTMLMessage tagName="span" id="off-to-on-chain.footer" />
    </h3>
    <HorizontalLine theme="yellow" size="narrow" />
  </div>
);
