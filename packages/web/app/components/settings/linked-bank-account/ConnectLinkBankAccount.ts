import * as React from "react";
import { compose } from "recompose";

import { actions } from "../../../modules/actions";
import { selectIsUserFullyVerified } from "../../../modules/auth/selectors";
import { EBankTransferType } from "../../../modules/bank-transfer-flow/reducer";
import { selectIsBankAccountVerified } from "../../../modules/bank-transfer-flow/selectors";
import { selectBankAccount } from "../../../modules/kyc/selectors";
import { TBankAccount } from "../../../modules/kyc/types";
import { appConnect } from "../../../store";
import { DeepReadonly } from "../../../types";
import { onEnterAction } from "../../../utils/OnEnterAction";

interface IDispatchProps {
  verifyBankAccount: () => void;
}

interface IStateProps {
  bankAccount: DeepReadonly<TBankAccount> | undefined;
  isBankAccountVerified: boolean;
  isUserFullyVerified: boolean;
}

interface IComponentProps {
  bankAccount?: DeepReadonly<TBankAccount>;
  isBankAccountVerified: boolean;
  isUserFullyVerified: boolean;
  verifyBankAccount: () => void;
}

const connectLinkBankAccountComponent = <T extends {}>(
  WrappedComponent: React.ComponentType<IComponentProps & T>,
) =>
  compose<IComponentProps & T, T>(
    onEnterAction({
      actionCreator: dispatch => {
        dispatch(actions.kyc.loadBankAccountDetails());
      },
    }),
    appConnect<IStateProps, IDispatchProps, T>({
      stateToProps: state => ({
        bankAccount: selectBankAccount(state),
        isBankAccountVerified: selectIsBankAccountVerified(state),
        isUserFullyVerified: selectIsUserFullyVerified(state),
      }),
      dispatchToProps: dispatch => ({
        verifyBankAccount: () =>
          dispatch(actions.bankTransferFlow.startBankTransfer(EBankTransferType.VERIFY)),
      }),
    }),
  )(WrappedComponent);

export { connectLinkBankAccountComponent };
