import * as React from "react";
import { Redirect } from "react-router";
import { branch, compose, renderComponent } from "recompose";

import { actions } from "../../../../modules/actions";
import { selectInvestorEtoWithCompanyAndContract } from "../../../../modules/eto/selectors";
import { TEtoWithCompanyAndContract } from "../../../../modules/eto/types";
import { appConnect } from "../../../../store";
import { onEnterAction } from "../../../../utils/OnEnterAction";
import { withContainer } from "../../../../utils/withContainer.unsafe";
import { etoPublicViewLink } from "../../../appRouteUtils";
import { Layout } from "../../../layouts/Layout";
import { LoadingIndicator } from "../../../shared/loading-indicator";

interface IStateProps {
  eto?: TEtoWithCompanyAndContract;
}

interface IRouterParams {
  previewCode: string;
}

type TProps = {
  eto: TEtoWithCompanyAndContract;
};

const RedirectToEtoLinkComponent: React.FunctionComponent<TProps> = ({ eto }) => (
  <Redirect to={etoPublicViewLink(eto.previewCode, eto.product.jurisdiction)} />
);

export const RedirectEtoPublicView = compose<TProps, IRouterParams>(
  appConnect<IStateProps, {}, IRouterParams>({
    stateToProps: (state, props) => ({
      eto: selectInvestorEtoWithCompanyAndContract(state, props.previewCode),
    }),
  }),
  withContainer(Layout),
  onEnterAction<IRouterParams>({
    actionCreator: (dispatch, props) => {
      dispatch(actions.eto.loadEtoPreview(props.previewCode));
    },
  }),
  branch<IStateProps>(props => !props.eto, renderComponent(LoadingIndicator)),
)(RedirectToEtoLinkComponent);
