import * as React from "react";
import { FormattedMessage } from "react-intl-phraseapp";

import { actions } from "../../../../modules/actions";
import { selectTxAdditionalData } from "../../../../modules/tx/sender/selectors";
import { TRedistributePayoutAdditionalData } from "../../../../modules/tx/transactions/payout/redistribute/types";
import { ETxSenderType } from "../../../../modules/tx/types";
import { appConnect } from "../../../../store";
import { ButtonArrowRight } from "../../../shared/buttons";
import { Message } from "../../Message";
import { RedistributeTransactionDetails } from "./RedistributeTransactionDetails";

import * as redistributeIcon from "../../../../assets/img/redistribute.svg";

interface IExternalProps {
  txTimestamp: number;
}

interface IStateProps {
  additionalData: TRedistributePayoutAdditionalData;
}

interface IDispatchProps {
  goToPortfolio: () => void;
}

type IProps = IExternalProps & IStateProps & IDispatchProps;

const InvestorRedistributePayoutSuccessLayout: React.FunctionComponent<IProps> = ({
  goToPortfolio,
  additionalData,
  txTimestamp,
}) => (
  <Message
    data-test-id="investor-payout.redistribute-success"
    image={<img src={redistributeIcon} alt="" className="mb-3" />}
    text={<FormattedMessage id="investor-payout.redistribute.success.text" />}
  >
    <RedistributeTransactionDetails
      additionalData={additionalData}
      className="mb-4"
      txTimestamp={txTimestamp}
    />

    <ButtonArrowRight onClick={goToPortfolio}>
      <FormattedMessage id="menu.portfolio.view" />
    </ButtonArrowRight>
  </Message>
);

const InvestorRedistributePayoutSuccess = appConnect<IStateProps, IDispatchProps>({
  stateToProps: state => ({
    additionalData: selectTxAdditionalData<ETxSenderType.INVESTOR_REDISTRIBUTE_PAYOUT>(state)!,
  }),
  dispatchToProps: dispatch => ({
    goToPortfolio: () => dispatch(actions.routing.goToPortfolio()),
  }),
})(InvestorRedistributePayoutSuccessLayout);

export { InvestorRedistributePayoutSuccess, InvestorRedistributePayoutSuccessLayout };
