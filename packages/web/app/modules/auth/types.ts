export enum ELogoutReason {
  SESSION_TIMEOUT = "sessionTimeout",
  USER_REQUESTED = "userRequested",
  ALREADY_LOGGED_IN = "alreadyLoggedIn",
}

export enum EUserAuthType {
  LOGOUT = "LOGOUT",
  LOGIN = "LOGIN",
  REFRESH = "REFRESH",
}
