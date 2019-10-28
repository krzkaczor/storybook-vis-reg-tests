import * as React from "react";
import { branch, compose, renderNothing } from "recompose";

import {
  EKycRequestStatus,
  ERequestOutsourcedStatus,
} from "../../../lib/api/kyc/KycApi.interfaces";
import { EUserType } from "../../../lib/api/users/interfaces";
import { actions } from "../../../modules/actions";
import {
  selectBackupCodesVerified,
  selectIsUserEmailVerified,
  selectUserType,
} from "../../../modules/auth/selectors";
import {
  selectExternalKycUrl,
  selectKycLoading,
  selectKycRequestOutsourcedStatus,
  selectKycRequestStatus,
  selectWidgetError,
} from "../../../modules/kyc/selectors";
import { appConnect } from "../../../store";
import { onEnterAction } from "../../../utils/OnEnterAction";
import { onLeaveAction } from "../../../utils/OnLeaveAction";

interface IStateProps {
  requestStatus?: EKycRequestStatus;
  requestOutsourcedStatus?: ERequestOutsourcedStatus;
  isUserEmailVerified: boolean;
  isLoading: boolean;
  backupCodesVerified: boolean;
  error?: string;
  externalKycUrl?: string;
  userType: EUserType;
}

interface IDispatchProps {
  onGoToDashboard: () => void;
  cancelInstantId: () => void;
  onGoToKycHome: () => void;
}

const connectKycStatusWidget = <T extends {}>(
  WrappedComponent: React.ComponentType<IStateProps & IDispatchProps & T>,
) =>
  compose<(IStateProps | null) & IDispatchProps & T, T>(
    appConnect<IStateProps | null, IDispatchProps, T>({
      stateToProps: state => {
        const userType = selectUserType(state);
        if (userType !== undefined) {
          return {
            userType,
            isUserEmailVerified: selectIsUserEmailVerified(state.auth),
            backupCodesVerified: selectBackupCodesVerified(state),
            requestStatus: selectKycRequestStatus(state),
            requestOutsourcedStatus: selectKycRequestOutsourcedStatus(state.kyc),
            externalKycUrl: selectExternalKycUrl(state.kyc),
            isLoading: selectKycLoading(state.kyc),
            error: selectWidgetError(state.kyc),
          };
        } else {
          return null;
        }
      },
      dispatchToProps: dispatch => ({
        onGoToDashboard: () => dispatch(actions.routing.goToDashboard()),
        cancelInstantId: () => dispatch(actions.kyc.kycCancelInstantId()),
        onGoToKycHome: () => dispatch(actions.routing.goToKYCHome()),
      }),
    }),
    branch<IStateProps | null>(props => props === null, renderNothing),
    // note: initial data for this view are loaded as part of app init process
    onEnterAction({
      actionCreator: d => d(actions.kyc.kycStartWatching()),
    }),
    onLeaveAction({
      actionCreator: d => d(actions.kyc.kycStopWatching()),
    }),
  )(WrappedComponent);

export { connectKycStatusWidget };
