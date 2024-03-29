import BigNumber from "bignumber.js";

import { multiplyBigNumbers } from "../../utils/BigNumberUtils";
import { confirmAccessModal, DEFAULT_PASSWORD, parseAmount, tid } from "../utils";
import { getBalanceRpc, getTransactionByHashRpc } from "../utils/ethRpcUtils";

const Q18 = new BigNumber("10").pow(18);

export const assertWithdrawButtonIsDisabled = () =>
  cy
    .get(tid("modals.tx-sender.withdraw-flow.withdraw-component.send-transaction-button"))
    .should("be.disabled");

export const typeWrongAddress = () => {
  assertWithdrawButtonIsDisabled();
  cy.get(tid("modals.tx-sender.withdraw-flow.withdraw-component.to-address")).type("0xCBD");
  assertWithdrawButtonIsDisabled();
  cy.get(tid("modals.tx-sender.withdraw-flow.withdraw-component.to-address")).clear();
};

export const typeWrongValue = () => {
  assertWithdrawButtonIsDisabled();

  cy.get(tid("modals.tx-sender.withdraw-flow.withdraw-component.value")).type("-1");
  assertWithdrawButtonIsDisabled();
  cy.get(tid("modals.tx-sender.withdraw-flow.withdraw-component.value")).clear();

  cy.get(tid("modals.tx-sender.withdraw-flow.withdraw-component.value")).type("df7");
  assertWithdrawButtonIsDisabled();
  cy.get(tid("modals.tx-sender.withdraw-flow.withdraw-component.value")).clear();
};

export const checkTransactionWithRPCNode = (
  expectedTransaction: {
    expectedFrom?: string;
    expectedInput?: string;
    expectedGasLimit?: string;
    writtenValue: string;
    expectedTo: string;
  },
  txHash: string,
  deductTransactionCost: boolean = false,
) => {
  getTransactionByHashRpc(txHash).then(data => {
    const { from, gas, input, hash, value, gasPrice } = data.body.result;

    const {
      expectedFrom,
      expectedInput,
      expectedGasLimit,
      writtenValue,
      expectedTo,
    } = expectedTransaction;
    const calculatedValue = deductTransactionCost
      ? Q18.mul(writtenValue)
          .minus(multiplyBigNumbers([new BigNumber(gas), new BigNumber(gasPrice)]))
          .toString()
      : Q18.mul(writtenValue).toString();

    expect(hash).to.equal(txHash);
    expect(new BigNumber(value).toString()).to.equal(calculatedValue);
    expectedFrom && expect(from).to.equal(expectedFrom);
    expectedGasLimit && expect(gas).to.equal(expectedGasLimit);
    expectedInput && expect(input).to.equal(expectedInput);

    getBalanceRpc(expectedTo).then((balance: { body: { result: string } }) => {
      const receivedEtherValue = new BigNumber(balance.body.result).toString();
      expect(receivedEtherValue).to.equal(calculatedValue);
      cy.log(`Real sent value ${receivedEtherValue}`);
      cy.log(`Expected sent value ${calculatedValue}`);
    });
  });
};

export const fillWithdrawForm = (testAddress: string, testValue: string) => {
  cy.get(tid("account-address.your.ether-address.from-div"))
    .then(address => address.text())
    .as("accountAddress");

  cy.get(tid("wallet.eth.withdraw.button")).awaitedClick();
  /*Test Address field validation*/
  typeWrongAddress();
  cy.get(tid("modals.tx-sender.withdraw-flow.withdraw-component.to-address"))
    .type(testAddress)
    .blur();
  /*Test Address field validation*/
  typeWrongValue();

  cy.get(tid("modals.tx-sender.withdraw-flow.withdraw-component.value"))
    .type(testValue.toString())
    .blur();
};

export const assertWithdrawFlow = (
  testAddress: string,
  testValue: string,
  expectedInput: string,
) => {
  getBalanceRpc(testAddress)
    .then(v => new BigNumber(v.body.result))
    .as("previousBalance");

  cy.get(tid(`etherscan-link.${testAddress}`)).should("exist");
  cy.get(tid("modals.tx-sender.withdraw-flow.summary.value.large-value"))
    .then(e => parseAmount(e.text()).toString())
    .should("eq", testValue);

  cy.get(tid("modals.tx-sender.withdraw-flow.summary.cost.large-value")).contains(/0\.\d{4}/);

  cy.get(tid("modals.tx-sender.withdraw-flow.summary.accept")).awaitedClick();

  confirmAccessModal(DEFAULT_PASSWORD);

  cy.get(tid("modals.shared.signing-message.modal")).should("exist");
  cy.get(tid("modals.tx-sender.withdraw-flow.success")).should("exist");

  cy.get(tid("modals.tx-sender.withdraw-flow.tx-hash")).then(txHashObject => {
    const txHash = txHashObject.attr("data-test-hash")!;
    getTransactionByHashRpc(txHash).then(data => {
      cy.get<string>("@accountAddress").then(accountAddress => {
        const { from, input, hash, value } = data.body.result;

        const ethValue = new BigNumber(value).toString();

        expect(from).to.equal(accountAddress.toLowerCase());
        expect(txHash).to.equal(hash);
        expect(input).to.equal(expectedInput);
        // do not check expected gas limit - any change in the solidity implementation will make test fail
        // expect(gas).to.equal(expectedGasLimit);
        expect(ethValue).to.equal(Q18.mul("0").toString());

        // TODO: Connect artifacts with tests to get deterministic addresses
        // expect(etherTokenAddress).to.equal(to);

        cy.get<BigNumber>("@previousBalance").then(previousBalance => {
          getBalanceRpc(testAddress).then(balance => {
            const currentBalance = new BigNumber(balance.body.result);
            const receivedValue = currentBalance.sub(previousBalance);
            expect(receivedValue.toString()).to.equal(Q18.mul(testValue).toString());
          });
        });
      });
    });
  });
};
