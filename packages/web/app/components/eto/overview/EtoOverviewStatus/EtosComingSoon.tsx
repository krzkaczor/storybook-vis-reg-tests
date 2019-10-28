import * as cn from "classnames";
import * as React from "react";
import { FormattedMessage } from "react-intl-phraseapp";

import { NeonHeader } from "../../../landing/shared/NeonHeader";

import * as statusWidgetStyles from "./EtoOverviewStatus.module.scss";
import * as styles from "./EtosComingSoon.module.scss";

export const EtosComingSoon: React.FunctionComponent = () => (
  <section className={cn(statusWidgetStyles.etoOverviewStatus, styles.etosComingSoon)}>
    <NeonHeader>
      <FormattedMessage id="dashboard.eto.coming-soon-placeholder" />
    </NeonHeader>
  </section>
);
