import * as React from "react";
import { FormattedMessage } from "react-intl-phraseapp";

import { actions } from "../../modules/actions";
import { selectEtoWithCompanyAndContractById } from "../../modules/eto/selectors";
import { EETOStateOnChain, TEtoWithCompanyAndContract } from "../../modules/eto/types";
import { appConnect } from "../../store";
import { InvestmentProgress } from "../eto/overview/InvestmentProgress";
import { Button, ButtonSize, EButtonLayout, EIconPosition } from "../shared/buttons";

import * as arrowRight from "../../assets/img/inline_icons/arrow_right.svg";

type TExternalProps = {
  state: EETOStateOnChain;
  etoId: string;
};

interface IDispatchProps {
  onClaim: (etoId: string) => void;
  onRefund: (etoId: string) => void;
}

interface IStateProps {
  eto: TEtoWithCompanyAndContract;
}

const PortfolioAssetActionComponent: React.FunctionComponent<
  TExternalProps & IDispatchProps & IStateProps
> = ({ state, etoId, onClaim, eto, onRefund }) => {
  switch (state) {
    case EETOStateOnChain.Claim:
    case EETOStateOnChain.Payout:
      return (
        <Button
          onClick={() => onClaim(etoId)}
          layout={EButtonLayout.SECONDARY}
          iconPosition={EIconPosition.ICON_AFTER}
          svgIcon={arrowRight}
          data-test-id={"modals.portfolio.portfolio-asset-action.claim-" + etoId}
          size={ButtonSize.SMALL}
        >
          <FormattedMessage id="portfolio.section.reserved-assets.claim-tokens" />
        </Button>
      );
    case EETOStateOnChain.Refund:
      return (
        <Button
          onClick={() => onRefund(etoId)}
          layout={EButtonLayout.SECONDARY}
          iconPosition={EIconPosition.ICON_AFTER}
          svgIcon={arrowRight}
          size={ButtonSize.SMALL}
        >
          <FormattedMessage id="portfolio.section.reserved-assets.refund" />
        </Button>
      );
    case EETOStateOnChain.Signing:
      return (
        <Button layout={EButtonLayout.SECONDARY} size={ButtonSize.SMALL} disabled>
          <FormattedMessage id="portfolio.section.reserved-assets.wait-for-update" />
        </Button>
      );

    case EETOStateOnChain.Public:
    case EETOStateOnChain.Whitelist:
      return <InvestmentProgress eto={eto} />;

    default:
      return null;
  }
};

const PortfolioAssetAction = appConnect<IStateProps, IDispatchProps, TExternalProps>({
  stateToProps: (state, props) => ({
    eto: selectEtoWithCompanyAndContractById(state, props.etoId)!,
  }),
  dispatchToProps: dispatch => ({
    onClaim: (etoId: string) => dispatch(actions.txTransactions.startUserClaim(etoId)),
    onRefund: (etoId: string) => dispatch(actions.txTransactions.startInvestorRefund(etoId)),
  }),
})(PortfolioAssetActionComponent);

export { PortfolioAssetAction };
