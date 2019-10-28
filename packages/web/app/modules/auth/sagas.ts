import { Effect, fork } from "redux-saga/effects";

import { authEmailSagas } from "./email/sagas";
import { authJwtSagas } from "./jwt/sagas";
import { authUserSagas } from "./user/sagas";
import { authWatcherSagas } from "./watcher/sagas";

export function* authSagas(): Iterator<Effect> {
  // sub-sagas
  yield fork(authEmailSagas);
  yield fork(authJwtSagas);
  yield fork(authWatcherSagas);
  yield fork(authUserSagas);
}
