import * as React from "react";

import { Proportion } from "../../shared/Proportion";

import * as styles from "./Panels.module.scss";

export interface IKycPanel {
  content: React.ReactNode;
  id: number;
  onClick?: () => void;
  "data-test-id"?: string;
}

interface IProps {
  panels: IKycPanel[];
}

export const Panels: React.FunctionComponent<IProps> = ({ panels }) => (
  <div className={styles.panels}>
    {panels.map(({ content, id, onClick, "data-test-id": dataTestId }) => (
      <div key={id} className={styles.panel}>
        <div className={styles.tile}>
          <Proportion onClick={onClick} dataTestId={dataTestId}>
            <div className={styles.cta}>{content}</div>
          </Proportion>
        </div>
      </div>
    ))}
  </div>
);
