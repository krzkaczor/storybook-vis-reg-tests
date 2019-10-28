import { put, take } from "redux-saga/effects";

import { TGlobalDependencies } from "../../../../di/setupBindings";
import { IUser, IUserInput } from "../../../../lib/api/users/interfaces";
import { actions } from "../../../actions";
import { loadKycRequestData } from "../../../kyc/sagas";
import { neuCall } from "../../../sagasUtils";
import { loadPreviousWallet } from "../../../web3/sagas";

export function* loadUser({ apiUserService }: TGlobalDependencies): Iterator<any> {
  const user: IUser = yield apiUserService.me();
  yield neuCall(loadPreviousWallet);
  yield put(actions.auth.setUser(user));
  yield neuCall(loadKycRequestData);
}

export async function createUserPromise(
  { apiUserService }: TGlobalDependencies,
  user: IUserInput,
): Promise<IUser> {
  return apiUserService.createAccount(user);
}

export function* createUser(newUser: IUserInput): Iterator<any> {
  const user: IUser = yield neuCall(createUserPromise, newUser);
  yield put(actions.auth.setUser(user));

  yield neuCall(loadKycRequestData);
}

export function* updateUser(
  { apiUserService }: TGlobalDependencies,
  updatedUser: IUserInput,
): Iterator<any> {
  const user: IUser = yield apiUserService.updateUser(updatedUser);
  yield put(actions.auth.setUser(user));
}

export function* logoutUser({
  web3Manager,
  jwtStorage,
  logger,
  userStorage,
}: TGlobalDependencies): Iterator<any> {
  userStorage.clear();
  jwtStorage.clear();

  yield web3Manager.unplugPersonalWallet();

  yield put(actions.web3.personalWalletDisconnected());
  yield put(actions.auth.reset());
  logger.info("user has been logged out");
}

export function* waitUntilUserLogoutIsDone(): Iterator<any> {
  yield take(actions.auth.reset.getType());
}
