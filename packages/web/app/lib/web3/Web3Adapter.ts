import { BigNumber } from "bignumber.js";
import { delay } from "redux-saga";
import * as Web3 from "web3";

import { makeEthereumAddressChecksummed } from "../../modules/web3/utils";
import {
  EthereumAddress,
  EthereumAddressWithChecksum,
  EthereumNetworkId,
} from "../../utils/opaque-types/types";
import { promisify } from "../../utils/PromiseUtils";

class Web3Error extends Error {}
export class NeuWeb3Error extends Error {}
export class UserHasNoFundsError extends NeuWeb3Error {}

export class NotEnoughEtherForGasError extends Web3Error {}
export class RevertedTransactionError extends Web3Error {}
export class OutOfGasError extends Web3Error {}
export class NotEnoughFundsError extends Web3Error {}

export class EthNodeError extends Error {}
export class LowGasNodeError extends EthNodeError {}
export class LowNonceError extends EthNodeError {}
export class LongTransactionQueError extends EthNodeError {}
export class InvalidRlpDataError extends EthNodeError {}
export class InvalidChangeIdError extends EthNodeError {}
export class UnknownEthNodeError extends EthNodeError {}

enum TRANSACTION_STATUS {
  REVERTED = "0x0",
  SUCCESS = "0x1",
}

/**
 * Layer on top of raw Web3js. Simplifies API for common operations. Adds promise support.
 * Note that some methods may be not supported correctly by exact implementation of your client
 */
export class Web3Adapter {
  constructor(public readonly web3: Web3) {}

  public async getNetworkId(): Promise<EthereumNetworkId> {
    return promisify<EthereumNetworkId>(this.web3.version.getNetwork)();
  }

  public async getBalance(address: string): Promise<BigNumber> {
    return promisify<BigNumber>(this.web3.eth.getBalance)(address);
  }

  public async estimateGas(txData: Partial<Web3.TxData>): Promise<number> {
    return promisify<number>(this.web3.eth.estimateGas)(txData);
  }

  public async getAccountAddress(): Promise<EthereumAddress> {
    const getAccounts = promisify<string[]>(this.web3.eth.getAccounts);
    const accounts = await getAccounts();
    return accounts[0] as EthereumAddress;
  }

  // returns mixed case checksummed ethereum address according to: https://github.com/ethereum/EIPs/blob/master/EIPS/eip-55.md
  public async getAccountAddressWithChecksum(): Promise<EthereumAddressWithChecksum> {
    const address = await this.getAccountAddress();
    return makeEthereumAddressChecksummed(address);
  }

  public async ethSign(
    address: EthereumAddress | EthereumAddressWithChecksum,
    data: string,
  ): Promise<string> {
    const sign = promisify<string>(this.web3.eth.sign);
    return sign(address, data);
  }

  public async signTypedData(
    address: EthereumAddress | EthereumAddressWithChecksum,
    data: ITypedDataToSign[],
  ): Promise<string> {
    const send = promisify<any>(
      this.web3.currentProvider.sendAsync.bind(this.web3.currentProvider),
    ); // web3 typings are not accurate here

    const resultData = await send({
      method: "eth_signTypedData",
      params: [data, address as string],
      from: address as string,
    });

    // as some web3 providers pass error as result, promisify may not throw
    if (resultData.error !== undefined) {
      throw resultData.error;
    }

    return resultData.result;
  }

  // Gnosis extension uses wallet_signTypedData to sign ERC712 typed data
  public async walletSignTypedData(
    address: EthereumAddress | EthereumAddressWithChecksum,
    data: string,
  ): Promise<string> {
    const send = promisify<any>(
      this.web3.currentProvider.sendAsync.bind(this.web3.currentProvider),
    ); // web3 typings are not accurate here

    const resultData = await send({
      method: "wallet_signTypedData",
      params: [address as string, data],
      from: address as string,
    });

    // as some web3 providers pass error as result, promisify may not throw
    if (resultData.error !== undefined) {
      throw resultData.error;
    }

    return resultData.result;
  }

  public async getTransactionReceipt(txHash: string): Promise<Web3.TransactionReceipt | null> {
    const getTransactionReceipt = promisify<Web3.TransactionReceipt>(
      this.web3.eth.getTransactionReceipt.bind(this.web3.eth),
    );
    return await getTransactionReceipt(txHash);
  }

  public async getTransactionByHash(txHash: string): Promise<Web3.Transaction> {
    const getTransactionByHash = promisify<Web3.Transaction>(
      this.web3.eth.getTransaction.bind(this.web3.eth),
    );
    return await getTransactionByHash(txHash);
  }

  public async getTransactionCount(address: string): Promise<number> {
    const getTransactionCount = promisify<number>(
      this.web3.eth.getTransactionCount.bind(this.web3.eth),
    );
    return await getTransactionCount(address);
  }

  /**
   * This will ensure that txData has nonce value.
   */
  public async sendRawTransaction(txData: string): Promise<string> {
    const send = promisify<any>(this.web3.eth.sendRawTransaction.bind(this.web3.eth));
    return await send(txData);
  }

  /**
   * This will ensure that txData has nonce value.
   */
  public async sendTransaction(txData: Web3.TxData): Promise<string> {
    const send = promisify<any>(this.web3.eth.sendTransaction.bind(this.web3.eth));

    // we manually add nonce value if needed
    // later it's needed by backend
    if (txData.nonce === undefined) {
      const getTransactionCount = promisify<number>(
        this.web3.eth.getTransactionCount.bind(this.web3.eth),
      );

      txData.nonce = await getTransactionCount(txData.from);
    }

    return await send(txData);
  }

  /**
   * Get information about transactions (from `web3.eth.getTransaction`) or `null` when transaction is pending
   * throws OutOfGasError or RevertedTransactionError in case of transaction not mined successfully
   */
  public async getTransactionOrThrow(txHash: string): Promise<Web3.Transaction | null> {
    const tx = await this.getTransactionByHash(txHash);
    const txReceipt = await this.getTransactionReceipt(txHash);

    // Both requests `getTx` and `getTransactionReceipt` can end up in two seperate nodes
    const isMined = tx && tx.blockNumber && txReceipt && txReceipt.blockNumber;
    if (!isMined) {
      return null;
    }

    if (txReceipt!.status === TRANSACTION_STATUS.REVERTED) {
      if (txReceipt!.gasUsed === tx.gas) {
        // All gas is burned in this case
        throw new OutOfGasError();
      }
      throw new RevertedTransactionError();
    }

    return tx;
  }

  public async waitForTx(options: IWaitForTxOptions): Promise<Web3.Transaction> {
    // TODO: Refactor Wait for TX
    return new Promise<Web3.Transaction>((resolve, reject) => {
      this.watchNewBlock(async blockId => {
        try {
          if (options.onNewBlock) {
            await options.onNewBlock(blockId);
          }

          const tx = await this.getTransactionOrThrow(options.txHash);

          if (!tx) {
            return;
          }

          resolve(tx);
          return true;
        } catch (e) {
          reject(e);
          return false;
        }
      }).catch(reject);
    });
  }

  // onNewBlock should return true to finish observing
  public async watchNewBlock(
    onNewBlock: (blockId: number) => Promise<boolean | void>,
  ): Promise<void> {
    let lastBlockId = -1;

    while (true) {
      const currentBlockNo = await this.getBlockNumber();
      if (lastBlockId !== currentBlockNo) {
        lastBlockId = currentBlockNo;

        const isFinished = await onNewBlock(lastBlockId);

        if (isFinished) {
          break;
        }
      }

      await delay(3000);
    }
  }

  public async getBlockNumber(): Promise<number> {
    const getBlockNumber = promisify<number>(this.web3.eth.getBlockNumber);

    return getBlockNumber();
  }

  public isSmartContract(address: EthereumAddress): Promise<boolean> {
    // in case of missing smartcontract, code can be equal to "0x0" or "0x" depending on exact web3 implementation
    // to cover all these cases we just check against the source code length — there won't be any meaningful EVM program in less then 3 chars
    return promisify<string>(this.web3.eth.getCode)(address).then(v => v.length >= 4);
  }
}

interface IWaitForTxOptions {
  txHash: string;
  onNewBlock?: (blockId: number) => Promise<void>;
}

interface ITypedDataToSign {
  type: string; // todo: here we could use more specific type. Something like "string" | "uint32" etc.
  name: string;
  value: string;
}
