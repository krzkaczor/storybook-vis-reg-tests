import * as React from "react";
import { FormattedMessage } from "react-intl-phraseapp";
import { branch, compose } from "recompose";

import { actions } from "../../../../modules/actions";
import {
  selectTxAdditionalData,
  selectTxGasCostEthUlps,
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
  blockId?: number;
  txTimestamp?: number;
  walletAddress: string;
}

interface IStateProps {
  additionalData?: TWithdrawAdditionalData;
  gasCost: string;
  gasCostEur: string;
}

interface IDispatchProps {
  onClick: () => void;
}

type TComponentProps = RequiredByKeys<IStateProps, "additionalData"> &
  IExternalProps &
  IDispatchProps;

export const WithdrawPendingComponent: React.FunctionComponent<TComponentProps> = ({
  additionalData,
  txHash,
  blockId,
  walletAddress,
  txTimestamp,
  gasCost,
  gasCostEur,
  onClick,
}) => (
  <section className={styles.contentWrapper} data-test-id="modals.shared.tx-pending.modal">
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
      status={ETxStatus.PENDING}
      txHash={txHash}
      blockId={blockId}
      isMined={true}
      txTimestamp={txTimestamp}
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

export const WithdrawPending = compose<TComponentProps, IExternalProps>(
  appConnect<IStateProps, IDispatchProps>({
    stateToProps: state => ({
      additionalData: selectTxAdditionalData<ETxSenderType.WITHDRAW>(state),
      walletAddress: selectEthereumAddressWithChecksum(state),
      gasCost: selectTxGasCostEthUlps(state),
      gasCostEur: selectTxGasCostEthUlps(state),
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
)(WithdrawPendingComponent);
