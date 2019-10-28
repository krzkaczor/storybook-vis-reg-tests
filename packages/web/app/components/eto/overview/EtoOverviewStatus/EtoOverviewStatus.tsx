import * as cn from "classnames";
import * as React from "react";
import { FormattedMessage } from "react-intl-phraseapp";
import { Link } from "react-router-dom";

import { EJurisdiction } from "../../../../lib/api/eto/EtoProductsApi.interfaces";
import { TEtoWithCompanyAndContract } from "../../../../modules/eto/types";
import { etoPublicViewLink } from "../../../appRouteUtils";
import { Container, EColumnSpan } from "../../../layouts/Container";
import { ETOInvestorState, ETOIssuerState } from "../../shared/ETOState";
import { EtoStats } from "./EtoStats";
import { EtoStatusManager } from "./EtoStatusManager/EtoStatusManager";
import { EtoTitle } from "./EtoTitle";
import { TagsWidget } from "./TagsWidget";

import * as styles from "./EtoOverviewStatus.module.scss";

interface IExternalProps {
  eto: TEtoWithCompanyAndContract;
  publicView: boolean;
  isEmbedded: boolean;
}

interface IStatusOfEtoProps {
  eto: TEtoWithCompanyAndContract;
  publicView: boolean;
}

interface IAdditionalInfoProps {
  isEmbedded: boolean;
  publicView: boolean;
  previewCode: string;
  jurisdiction: EJurisdiction;
}

const StatusOfEto: React.FunctionComponent<IStatusOfEtoProps> = ({ eto, publicView }) => (
  <div className={styles.statusOfEto}>
    {/* In case it's a public view (something investor sees) show proper investor status, otherwise show issuer related state */}
    {publicView ? <ETOInvestorState eto={eto} /> : <ETOIssuerState eto={eto} />}
  </div>
);

const PoweredByNeufund = () => (
  <div className={styles.poweredByNeufund} data-test-id="eto-overview-powered-by">
    <div className={styles.powered}>Powered by</div>
    <Link className={styles.neufund} target={"_blank"} to={"https://neufund.org"}>
      NEUFUND
    </Link>
  </div>
);

const AdditionalInfo: React.FunctionComponent<IAdditionalInfoProps> = ({
  isEmbedded,
  publicView,
  previewCode,
  jurisdiction,
}) => {
  if (isEmbedded) {
    return <PoweredByNeufund />;
  } else if (!publicView) {
    return (
      <Link className={styles.moreDetails} to={etoPublicViewLink(previewCode, jurisdiction)}>
        <FormattedMessage id="shared-component.eto-overview.more-details" />
      </Link>
    );
  } else {
    return null;
  }
};

const Divider = ({ className }: { className?: string }) => (
  <div className={cn(styles.divider, className)} />
);

export const EtoOverviewStatus: React.FunctionComponent<IExternalProps> = ({
  eto,
  publicView,
  isEmbedded,
}) => (
  <Container
    className={styles.etoOverviewStatus}
    data-test-id={`eto-overview-${eto.etoId}`}
    columnSpan={EColumnSpan.THREE_COL}
  >
    <div className={styles.overviewWrapper}>
      <StatusOfEto eto={eto} publicView={publicView} />
      <EtoTitle eto={eto} isEmbedded={isEmbedded} />
      <Divider className={styles.dividerExtra} />
      <TagsWidget eto={eto} innerClass={styles.tagItem} isEmbedded={isEmbedded} />
      <Divider />
      <EtoStats eto={eto} />
      <Divider />
      <EtoStatusManager eto={eto} isEmbedded={isEmbedded} />
      <AdditionalInfo
        isEmbedded={isEmbedded}
        publicView={publicView}
        previewCode={eto.previewCode}
        jurisdiction={eto.product.jurisdiction}
      />
    </div>
  </Container>
);
