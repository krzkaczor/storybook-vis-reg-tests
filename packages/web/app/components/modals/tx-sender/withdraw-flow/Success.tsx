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
  txTimestamp: number;
}

interface IDispatchProps {
  onClick: () => void;
}

interface IStateProps {
  additionalData?: TWithdrawAdditionalData;
  gasCost: string;
  gasCostEur: string;
  walletAddress: string;
}

type TComponentProps = RequiredByKeys<IStateProps, "additionalData"> &
  IExternalProps &
  IDispatchProps;

export const WithdrawSuccessLayout: React.FunctionComponent<TComponentProps> = ({
  additionalData,
  txHash,
  walletAddress,
  txTimestamp,
  gasCost,
  gasCostEur,
  onClick,
}) => (
  <section className={styles.contentWrapper} data-test-id="modals.tx-sender.withdraw-flow.success">
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
      status={ETxStatus.SUCCESS}
      txHash={txHash}
      txTimestamp={txTimestamp}
      walletAddress={walletAddress}
      gasCost={gasCost}
      isMined={true}
      gasCostEur={gasCostEur}
    />

    <section className="text-center">
      <Button onClick={onClick} data-test-id="modals.tx-sender.withdraw-flow.summary.accept">
        <FormattedMessage id="withdraw-flow.close-summary" />
      </Button>
    </section>
  </section>
);

export const WithdrawSuccess = compose<TComponentProps, {}>(
  appConnect<IStateProps, {}>({
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
)(WithdrawSuccessLayout);
