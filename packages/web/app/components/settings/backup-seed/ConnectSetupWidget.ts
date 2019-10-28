import * as React from "react";
import { compose } from "recompose";

import { actions } from "../../../modules/actions";
import { selectBackupCodesVerified } from "../../../modules/auth/selectors";
import { appConnect } from "../../../store";

interface IStateProps {
  backupCodesVerified: boolean;
}

interface IDispatchProps {
  startBackupProcess: () => void;
}

const connectBackupSeedWidget = <T extends {}>(
  WrappedComponent: React.ComponentType<IStateProps & IDispatchProps & T>,
) =>
  compose<IStateProps & IDispatchProps & T, T>(
    appConnect<IStateProps, IDispatchProps, T>({
      stateToProps: s => ({
        backupCodesVerified: selectBackupCodesVerified(s),
      }),
      dispatchToProps: dispatch => ({
        startBackupProcess: () => dispatch(actions.routing.goToSeedBackup()),
      }),
    }),
  )(WrappedComponent);

export { connectBackupSeedWidget };
