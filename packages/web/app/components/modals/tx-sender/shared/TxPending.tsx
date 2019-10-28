import * as React from "react";
import { FormattedMessage } from "react-intl-phraseapp";
import { compose } from "recompose";

import { ITxData } from "../../../../lib/web3/types";
import { actions } from "../../../../modules/actions";
import {
  selectTxAdditionalData,
  selectTxDetails,
  selectTxTimestamp,
} from "../../../../modules/tx/sender/selectors";
import { ETxSenderType, TSpecificTransactionState } from "../../../../modules/tx/types";
import { selectEthereumAddressWithChecksum } from "../../../../modules/web3/selectors";
import { appConnect } from "../../../../store";
import { EthereumAddressWithChecksum } from "../../../../utils/opaque-types/types";
import { Button } from "../../../shared/buttons/Button";
import { EthereumIcon } from "../../../shared/ethereum";
import { Message } from "../../Message";
import { TxDetails } from "../TxDetails.unsafe";
import { TxName } from "../TxName";
import { WithdrawPending } from "../withdraw-flow/Pending";
import { TxHashAndBlock } from "./TxHashAndBlock";

export interface IStateProps {
  txData?: Partial<ITxData>;
  txTimestamp?: number;
  additionalData?: TSpecificTransactionState["additionalData"];
  walletAddress: EthereumAddressWithChecksum;
}

export interface ITxPendingProps {
  blockId?: number;
  txHash?: string;
  type: TSpecificTransactionState["type"];
}

interface IDispatchProps {
  deletePendingTransaction: () => void;
  goToWallet: () => void;
}

type TTxPendingLayoutProps = {
  txData?: Partial<ITxData>;
  blockId?: number;
  walletAddress: string;
  txHash?: string;
  txTimestamp?: number;
} & TSpecificTransactionState &
  IDispatchProps;

const TxDefaultPendingLayout: React.FunctionComponent<TTxPendingLayoutProps> = props => (
  <Message
    data-test-id="modals.shared.tx-pending.modal"
    image={<EthereumIcon className="mb-3" />}
    title={
      <FormattedMessage
        id="tx-sender.tx-pending.title"
        values={{ transaction: <TxName type={props.type} /> }}
      />
    }
    text={<FormattedMessage id="tx-sender.tx-pending.description" />}
  >
    <TxDetails className="mb-3" {...props} />

    {props.txHash && <TxHashAndBlock txHash={props.txHash} blockId={props.blockId} />}

    {/* This feature is only for testing purpose should not be enabled on production environment. */}
    {/* Because of it there is no need to include button string in translations */}
    {process.env.NF_ENABLE_TRANSACTION_RESET === "1" && (
      <Button className="mt-4" onClick={() => props.deletePendingTransaction()}>
        Delete transaction
      </Button>
    )}
  </Message>
);

const TxPendingLayout: React.FunctionComponent<TTxPendingLayoutProps> = props => {
  switch (props.type) {
    case ETxSenderType.WITHDRAW:
      return (
        <WithdrawPending
          txHash={props.txHash!}
          blockId={props.blockId}
          txTimestamp={props.txTimestamp}
          walletAddress={props.walletAddress}
        />
      );
    default:
      return <TxDefaultPendingLayout {...props} />;
  }
};

const TxPending = compose<TTxPendingLayoutProps, ITxPendingProps>(
  appConnect<IStateProps, IDispatchProps>({
    dispatchToProps: d => ({
      deletePendingTransaction: () => d(actions.txMonitor.deletePendingTransaction()),
      goToWallet: () => d(actions.routing.goToWallet()),
    }),
    stateToProps: state => ({
      txData: selectTxDetails(state),
      txTimestamp: selectTxTimestamp(state),
      additionalData: selectTxAdditionalData(state),
      walletAddress: selectEthereumAddressWithChecksum(state),
    }),
  }),
)(TxPendingLayout);

export { TxPending, TxPendingLayout };
