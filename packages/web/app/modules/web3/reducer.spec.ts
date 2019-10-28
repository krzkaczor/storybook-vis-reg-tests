import { expect } from "chai";

import { dummyEthereumAddress } from "../../../test/fixtures";
import { actions } from "../actions";
import { web3Actions } from "./actions";
import {
  IConnectedWeb3State,
  IDisconnectedWeb3State,
  IWeb3State,
  web3InitialState,
  web3Reducer,
} from "./reducer";
import { EWalletSubType, EWalletType } from "./types";

describe("Web3 > reducer", () => {
  it("should act on NEW_PERSONAL_WALLET_PLUGGED action", () => {
    const initialState = web3InitialState;
    const actionPayload = {
      type: EWalletType.BROWSER,
      subType: EWalletSubType.METAMASK,
      ethereumAddress: dummyEthereumAddress,
      isUnlocked: true,
    };

    const actualNewState = web3Reducer(
      initialState,
      web3Actions.newPersonalWalletPlugged(
        {
          walletType: EWalletType.BROWSER,
          address: dummyEthereumAddress,
          walletSubType: EWalletSubType.METAMASK,
        },
        actionPayload.isUnlocked,
      ),
    );

    expect(actualNewState).to.be.deep.eq({
      connected: true,
      wallet: {
        walletType: EWalletType.BROWSER,
        walletSubType: EWalletSubType.METAMASK,
        address: dummyEthereumAddress,
      },
      isUnlocked: true,
    });
  });

  it("should act on PERSONAL_WALLET_DISCONNECTED when previously it was connected", () => {
    const initialState: IWeb3State = {
      connected: true,
      wallet: {
        walletType: EWalletType.BROWSER,
        address: dummyEthereumAddress,
        walletSubType: EWalletSubType.METAMASK,
      },
      isUnlocked: true,
    };

    const actualNewState = web3Reducer(initialState, actions.web3.personalWalletDisconnected());

    expect(actualNewState).to.be.deep.eq({
      connected: false,
      previousConnectedWallet: {
        walletType: EWalletType.BROWSER,
        walletSubType: EWalletSubType.METAMASK,
        address: dummyEthereumAddress,
      },
    });
  });

  it("should act on PERSONAL_WALLET_DISCONNECTED action", () => {
    const initialState = web3InitialState;

    const actualNewState = web3Reducer(initialState, actions.web3.personalWalletDisconnected());

    expect(actualNewState).to.be.deep.eq({
      connected: false,
      previousConnectedWallet: undefined,
    });
  });

  describe("WEB3_WALLET_UNLOCKED", () => {
    it("should act on action when connected", () => {
      const initialState: IConnectedWeb3State = {
        connected: true,
        wallet: {
          walletType: EWalletType.BROWSER,
          address: dummyEthereumAddress,
          walletSubType: EWalletSubType.METAMASK,
        },
        isUnlocked: true,
      };

      const actualNewState = web3Reducer(initialState, actions.web3.walletLocked());

      expect(actualNewState).to.be.deep.eq({
        connected: true,
        wallet: {
          walletType: EWalletType.BROWSER,
          walletSubType: EWalletSubType.METAMASK,
          address: dummyEthereumAddress,
        },
        isUnlocked: false,
      });
    });

    it("should do nothing when not connected", () => {
      const initialState: IDisconnectedWeb3State = {
        connected: false,
      };

      const actualNewState = web3Reducer(initialState, actions.web3.walletLocked());

      expect(actualNewState).to.be.deep.eq(initialState);
    });
  });
});
