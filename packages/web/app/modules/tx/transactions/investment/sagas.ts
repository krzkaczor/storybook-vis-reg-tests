import { BigNumber } from "bignumber.js";
import { fork, put, select, take } from "redux-saga/effects";

import { TGlobalDependencies } from "../../../../di/setupBindings";
import { ITxData } from "../../../../lib/web3/types";
import { IAppState } from "../../../../store";
import { compareBigNumbers } from "../../../../utils/BigNumberUtils";
import { actions, TActionFromCreator } from "../../../actions";
import { selectEtoWithCompanyAndContractById } from "../../../eto/selectors";
import { TEtoWithCompanyAndContract } from "../../../eto/types";
import { selectStandardGasPriceWithOverHead } from "../../../gas/selectors";
import { EInvestmentType } from "../../../investment-flow/reducer";
import { onInvestmentTxModalHide } from "../../../investment-flow/sagas";
import {
  selectInvestmentEthValueUlps,
  selectInvestmentEtoId,
  selectInvestmentEurValueUlps,
  selectIsICBMInvestment,
} from "../../../investment-flow/selectors";
import {
  selectEquityTokenCountByEtoId,
  selectNeuRewardUlpsByEtoId,
} from "../../../investor-portfolio/selectors";
import { neuCall, neuTakeLatest } from "../../../sagasUtils";
import { selectEtherPriceEur } from "../../../shared/tokenPrice/selectors";
import { selectEtherTokenBalance } from "../../../wallet/selectors";
import { selectEthereumAddressWithChecksum } from "../../../web3/selectors";
import { txSendSaga } from "../../sender/sagas";
import { selectTxGasCostEthUlps } from "../../sender/selectors";
import { ETxSenderType, TAdditionalDataByType } from "../../types";

export const INVESTMENT_GAS_AMOUNT = "600000";

function* getEtherTokenTransaction(
  { contractsService }: TGlobalDependencies,
  etoId: string,
  investAmountUlps: BigNumber,
): Iterator<any> {
  const etherTokenBalance = yield select(selectEtherTokenBalance);
  if (!etherTokenBalance) {
    throw new Error("No ether Token Balance");
  }
  if (compareBigNumbers(etherTokenBalance, investAmountUlps) >= 0) {
    // transaction can be fully covered by etherTokens

    // Call IERC223 compliant transfer function
    // otherwise ETOCommitment is not aware of any investment
    // TODO: Fix when TypeChain support overloads
    const txInput = contractsService.etherToken.rawWeb3Contract.transfer[
      "address,uint256,bytes"
    ].getData(etoId, investAmountUlps, "");
    return { data: txInput, to: contractsService.etherToken.address };
  } else {
    // fill up etherToken with ether from wallet
    const ethVal = new BigNumber(investAmountUlps);
    const value = ethVal.sub(etherTokenBalance);
    const txCall = contractsService.etherToken.depositAndTransferTx(etoId, ethVal, [""]).getData();

    return {
      value: value.toFixed(0, BigNumber.ROUND_DOWN),
      data: txCall,
      to: contractsService.etherToken.address,
    };
  }
}

export function* generateInvestmentTransaction(
  { contractsService, web3Manager }: TGlobalDependencies,
  {
    investmentType,
    etoId,
    investAmountUlps,
  }: { investmentType: EInvestmentType; etoId: string; investAmountUlps: BigNumber },
): Iterator<any> {
  const from: string = yield select(selectEthereumAddressWithChecksum);
  const gasPrice: string = yield select(selectStandardGasPriceWithOverHead);
  let data;
  let to;
  let value;

  switch (investmentType) {
    case EInvestmentType.Eth:
      ({ value, data } = yield neuCall(getEtherTokenTransaction, etoId, investAmountUlps));
      to = contractsService.etherToken.address;
      break;
    case EInvestmentType.NEur:
      data = yield contractsService.euroToken.rawWeb3Contract.transfer[
        "address,uint256,bytes"
      ].getData(etoId, investAmountUlps, "");
      to = contractsService.euroToken.address;
      break;
    case EInvestmentType.ICBMEth:
      data = yield contractsService.etherLock.transferTx(etoId, investAmountUlps, [""]).getData();
      to = contractsService.etherLock.address;
      break;
    case EInvestmentType.ICBMnEuro:
      data = yield contractsService.euroLock.transferTx(etoId, investAmountUlps, [""]).getData();
      to = contractsService.euroLock.address;
      break;
  }
  const transaction: Partial<ITxData> = {
    to,
    from,
    data,
    value: value || "0",
    gasPrice,
  };
  const gas = yield web3Manager.estimateGasWithOverhead(transaction);

  return { ...transaction, gas };
}

function* investmentFlowGenerator({ logger }: TGlobalDependencies): Iterator<any> {
  yield take(actions.txSender.txSenderAcceptDraft);

  const etoId: string = yield select(selectInvestmentEtoId);
  const eto: TEtoWithCompanyAndContract = yield select((state: IAppState) =>
    selectEtoWithCompanyAndContractById(state, etoId),
  );

  const investmentEth: string = yield select(selectInvestmentEthValueUlps);
  const investmentEur: string = yield select(selectInvestmentEurValueUlps);
  const gasCostEth: string = yield select(selectTxGasCostEthUlps);
  const equityTokens: string = yield select((state: IAppState) =>
    selectEquityTokenCountByEtoId(state, etoId),
  );
  const estimatedReward: string = yield select((state: IAppState) =>
    selectNeuRewardUlpsByEtoId(state, etoId),
  );

  const etherPriceEur: string = yield select(selectEtherPriceEur);
  const isIcbm: boolean = yield select(selectIsICBMInvestment);

  if (!eto.investmentCalculatedValues) {
    logger.error("ETO investment calculated values are empty");
    throw new Error("ETO investment calculated values are empty");
  }

  const additionalData: TAdditionalDataByType<ETxSenderType.INVEST> = {
    eto: {
      etoId,
      companyName: eto.company.name,
      equityTokensPerShare: eto.equityTokensPerShare,
      sharePrice: eto.investmentCalculatedValues.sharePrice,
      equityTokenInfo: {
        equityTokenSymbol: eto.equityTokenSymbol,
        equityTokenImage: eto.equityTokenImage,
        equityTokenName: eto.equityTokenName,
      },
    },
    investmentEth,
    investmentEur,
    gasCostEth,
    equityTokens,
    estimatedReward,
    etherPriceEur,
    isIcbm,
  };

  yield put(actions.txSender.txSenderContinueToSummary(additionalData));
}

function* investSaga(
  { logger }: TGlobalDependencies,
  { payload }: TActionFromCreator<typeof actions.txTransactions.startInvestment>,
): Iterator<any> {
  try {
    yield txSendSaga({
      type: ETxSenderType.INVEST,
      transactionFlowGenerator: investmentFlowGenerator,
    });
    logger.info("Investment successful");
  } catch (e) {
    // Add clean up functions here ...
    yield onInvestmentTxModalHide();
    logger.info("Investment cancelled", e);
  } finally {
    yield put(actions.eto.loadEto(payload.etoId));
  }
}

export const txInvestmentSagas = function*(): Iterator<any> {
  yield fork(neuTakeLatest, actions.txTransactions.startInvestment, investSaga);
};
