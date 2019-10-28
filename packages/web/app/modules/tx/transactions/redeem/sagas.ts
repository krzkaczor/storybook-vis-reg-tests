import BigNumber from "bignumber.js";
import { fork, put, select, take } from "redux-saga/effects";

import { MONEY_DECIMALS } from "../../../../config/constants";
import { TGlobalDependencies } from "../../../../di/setupBindings";
import { ITxData } from "../../../../lib/web3/types";
import { DeepReadonly } from "../../../../types";
import { compareBigNumbers } from "../../../../utils/BigNumberUtils";
import { convertToUlps } from "../../../../utils/NumberUtils";
import { actions } from "../../../actions";
import { EBankTransferType } from "../../../bank-transfer-flow/reducer";
import {
  selectBankFeeUlps,
  selectIsBankAccountVerified,
} from "../../../bank-transfer-flow/selectors";
import { selectStandardGasPriceWithOverHead } from "../../../gas/selectors";
import { selectBankAccount } from "../../../kyc/selectors";
import { TBankAccount } from "../../../kyc/types";
import { neuCall, neuTakeLatest } from "../../../sagasUtils";
import { selectLiquidEuroTokenBalance } from "../../../wallet/selectors";
import { selectEthereumAddressWithChecksum } from "../../../web3/selectors";
import { txSendSaga } from "../../sender/sagas";
import { ETxSenderType } from "../../types";

function* generateNeuWithdrawTransaction(
  { contractsService, web3Manager }: TGlobalDependencies,
  amount: string,
): any {
  const from: string = yield select(selectEthereumAddressWithChecksum);
  const gasPriceWithOverhead = yield select(selectStandardGasPriceWithOverHead);

  const txInput = contractsService.euroToken.withdrawTx(new BigNumber(amount)).getData();

  const txDetails: Partial<ITxData> = {
    to: contractsService.euroToken.address,
    from,
    data: txInput,
    value: "0",
    gasPrice: gasPriceWithOverhead,
  };
  const estimatedGasWithOverhead = yield web3Manager.estimateGasWithOverhead(txDetails);
  return { ...txDetails, gas: estimatedGasWithOverhead };
}

function* startNEuroRedeemGenerator(_: TGlobalDependencies): any {
  // Wait for withdraw confirmation
  const action = yield take(actions.txSender.txSenderAcceptDraft);
  const txDataFromUser = action.payload.txDraftData;
  const selectedAmount = txDataFromUser.value;

  const nEURBalanceUlps = yield select(selectLiquidEuroTokenBalance);

  const nEURBalance = new BigNumber(nEURBalanceUlps)
    .div(new BigNumber("10").pow(MONEY_DECIMALS))
    .toFixed(2, BigNumber.ROUND_DOWN);

  // Whole precision number should be passed when there is whole balance redeemed
  // also when user provided value has been used, then it have to be converted to Q18 via convertToUlps
  const redeemAmountUlps =
    compareBigNumbers(selectedAmount, nEURBalance) === 0
      ? nEURBalanceUlps
      : convertToUlps(selectedAmount);

  const generatedTxDetails: ITxData = yield neuCall(
    generateNeuWithdrawTransaction,
    redeemAmountUlps,
  );

  yield put(actions.txSender.setTransactionData(generatedTxDetails));

  const bankAccount: DeepReadonly<TBankAccount> = yield select(selectBankAccount);
  if (!bankAccount.hasBankAccount) {
    throw new Error("During redeem process user should have bank account");
  }

  const bankFee: string = yield select(selectBankFeeUlps);

  const additionalDetails = {
    bankFee,
    amount: txDataFromUser.value,
    bankAccount: {
      bankName: bankAccount.details.bankName,
      accountNumberLast4: bankAccount.details.bankAccountNumberLast4,
    },
  };

  yield put(
    actions.txSender.txSenderContinueToSummary<ETxSenderType.NEUR_REDEEM>(additionalDetails),
  );
}

function* neurRedeemSaga({ logger }: TGlobalDependencies): Iterator<any> {
  const isVerified: boolean = yield select(selectIsBankAccountVerified);

  if (!isVerified) {
    yield put(actions.bankTransferFlow.startBankTransfer(EBankTransferType.VERIFY));
    return;
  }

  try {
    yield txSendSaga({
      type: ETxSenderType.NEUR_REDEEM,
      transactionFlowGenerator: startNEuroRedeemGenerator,
    });

    logger.info("Investor nEUR withdrawal successful");
  } catch (e) {
    logger.info("Investor nEUR withdrawal cancelled", e);
  }
}

export const txRedeemSagas = function*(): Iterator<any> {
  yield fork(neuTakeLatest, actions.txTransactions.startWithdrawNEuro, neurRedeemSaga);
};
