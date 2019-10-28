import BroadcastChannel from "broadcast-channel";

export const createNewBroadcastChannel = <T>(key: string): BroadcastChannel<T> =>
  // Currently we will only force localstorage until issue 29 is solved
  //@SEE https://github.com/pubkey/broadcast-channel/issues/29
  new BroadcastChannel(key, {
    webWorkerSupport: false,
  });

export type BroadcastChannel<T> = BroadcastChannel<T>;
