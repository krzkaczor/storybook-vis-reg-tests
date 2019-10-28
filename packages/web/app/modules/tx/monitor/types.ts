import * as Web3 from "web3";

export enum EEventEmitterChannelEvents {
  NEW_BLOCK = "NEW_BLOCK",
  TX_MINED = "TX_MINED",
  ERROR = "ERROR",
  REVERTED_TRANSACTION = "REVERTED_TRANSACTION",
  OUT_OF_GAS = "OUT_OF_GAS",
}

export type TEventEmitterChannelEvents =
  | {
      type: EEventEmitterChannelEvents.NEW_BLOCK;
      blockId: number;
    }
  | {
      type: EEventEmitterChannelEvents.TX_MINED;
      tx: Web3.Transaction;
    }
  | {
      type: EEventEmitterChannelEvents.ERROR;
      error: any;
    }
  | {
      type: EEventEmitterChannelEvents.REVERTED_TRANSACTION;
      error: any;
    }
  | {
      type: EEventEmitterChannelEvents.OUT_OF_GAS;
      error: any;
    };
