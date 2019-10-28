import { EWalletType } from "../../../modules/web3/types";
import { EUserType } from "../../api/users/interfaces";

export type TUser = { id: string; type: EUserType; walletType: EWalletType };
export type LogArg = string | object;
export type ErrorArgs = LogArg | Error;

export interface ILogger {
  info(...args: LogArg[]): void;
  verbose(...args: LogArg[]): void;
  debug(...args: LogArg[]): void;
  warn(...args: ErrorArgs[]): void;
  error(...args: ErrorArgs[]): void;
  fatal(message: string, error: Error, data?: object): void;
  setUser(user: TUser | null): void;
}

export type TLogLevels = Exclude<keyof ILogger, "setUser">;
