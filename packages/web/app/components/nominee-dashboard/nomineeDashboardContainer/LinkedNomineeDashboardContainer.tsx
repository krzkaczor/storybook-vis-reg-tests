import * as React from "react";
import { compose } from "recompose";

import { TEtoWithCompanyAndContract } from "../../../modules/eto/types";
import { selectNomineeEtoWithCompanyAndContract } from "../../../modules/nominee-flow/selectors";
import { appConnect } from "../../../store";
import { NomineeEtoOverviewThumbnail } from "../../eto/overview/EtoOverviewThumbnail/EtoOverviewThumbnail";

import * as styles from "../NomineeDashboard.module.scss";

interface ILinkedNomineeStateProps {
  eto: TEtoWithCompanyAndContract | undefined;
}

interface ILinkedNomineeComponentProps {
  eto: TEtoWithCompanyAndContract;
}

const LinkedNomineeDashboardContainerLayout: React.FunctionComponent<
  ILinkedNomineeComponentProps
> = ({ children, eto }) => (
  <div data-test-id="nominee-dashboard" className={styles.linkedNomineeDashboardContainer}>
    <section className={styles.dashboardContentPanel}>{children}</section>
    {eto && <NomineeEtoOverviewThumbnail eto={eto} shouldOpenInNewWindow={false} />}
  </div>
);

export const LinkedNomineeDashboardContainer = compose<ILinkedNomineeComponentProps, {}>(
  appConnect<ILinkedNomineeStateProps, {}, {}>({
    stateToProps: state => ({
      eto: selectNomineeEtoWithCompanyAndContract(state),
    }),
  }),
)(LinkedNomineeDashboardContainerLayout);
