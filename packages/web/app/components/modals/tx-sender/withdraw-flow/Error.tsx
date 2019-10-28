import * as React from "react";
import { FormattedMessage } from "react-intl-phraseapp";
import { branch, compose, withProps } from "recompose";

import { actions } from "../../../../modules/actions";
import { ETransactionErrorType } from "../../../../modules/tx/sender/reducer";
import {
  selectTxAdditionalData,
  selectTxGasCostEthUlps,
  selectTxGasCostEurUlps,
} from "../../../../modules/tx/sender/selectors";
import { TWithdrawAdditionalData } from "../../../../modules/tx/transactions/withdraw/types";
import { ETxSenderType } from "../../../../modules/tx/types";
import { selectEthereumAddressWithChecksum } from "../../../../modules/web3/selectors";
import { appConnect } from "../../../../store";
import { RequiredByKeys } from "../../../../types";
import { Button } from "../../../shared/buttons";
import { EHeadingSize, Heading } from "../../../shared/Heading";
import { ETxStatus } from "../types";
import { WithdrawTransactionDetails } from "./WithdrawTransactionDetails";

import * as styles from "./Withdraw.module.scss";

interface IExternalProps {
  txHash: string;
  txTimestamp?: number;
  error?: ETransactionErrorType;
}

interface IStateProps {
  additionalData?: TWithdrawAdditionalData;
  walletAddress: string;
  gasCost: string;
  gasCostEur: string;
}

interface IDispatchProps {
  onClick: () => void;
}

interface IComputedProps {
  isMined: boolean;
}

type TComponentProps = RequiredByKeys<IStateProps, "additionalData"> &
  IExternalProps &
  IDispatchProps &
  IComputedProps;

export const WithdrawErrorLayout: React.FunctionComponent<TComponentProps> = ({
  additionalData,
  txHash,
  txTimestamp,
  walletAddress,
  error,
  isMined,
  gasCost,
  onClick,
  gasCostEur,
}) => (
  <section className={styles.contentWrapper} data-test-id="modals.tx-sender.withdraw-flow.error">
    <Heading
      className="mb-4"
      size={EHeadingSize.HUGE}
      level={4}
      decorator={false}
      disableTransform={true}
    >
      <FormattedMessage id="withdraw-flow.summary" />
    </Heading>

    <WithdrawTransactionDetails
      additionalData={additionalData}
      status={ETxStatus.ERROR}
      txHash={txHash}
      txTimestamp={txTimestamp}
      error={error}
      isMined={isMined}
      walletAddress={walletAddress}
      gasCost={gasCost}
      gasCostEur={gasCostEur}
    />
    <section className="text-center">
      <Button onClick={onClick} data-test-id="modals.tx-sender.withdraw-flow.summary.accept">
        <FormattedMessage id="withdraw-flow.close-summary" />
      </Button>
    </section>
  </section>
);

export const WithdrawError = compose<TComponentProps, IExternalProps>(
  appConnect<IStateProps, IDispatchProps>({
    stateToProps: state => ({
      additionalData: selectTxAdditionalData<ETxSenderType.WITHDRAW>(state),
      walletAddress: selectEthereumAddressWithChecksum(state),
      gasCost: selectTxGasCostEthUlps(state),
      gasCostEur: selectTxGasCostEurUlps(state),
    }),
    dispatchToProps: d => ({
      onClick: () => d(actions.txSender.txSenderHideModal()),
    }),
  }),
  branch<IStateProps>(
    props => props.additionalData === undefined,
    () => {
      throw new Error("Additional transaction data is empty");
    },
  ),
  withProps<IComputedProps, IExternalProps>(props => ({
    // TODO: Take is Mined check out and connect it with a selector to avoid mistakes
    isMined:
      props.error === ETransactionErrorType.REVERTED_TX ||
      props.error === ETransactionErrorType.OUT_OF_GAS,
  })),
)(WithdrawErrorLayout);
