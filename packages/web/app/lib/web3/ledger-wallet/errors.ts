export class LedgerError extends Error {}
export class LedgerConfirmationRejectedError extends LedgerError {}
export class LedgerContractsDisabledError extends LedgerError {}
export class LedgerLockedError extends LedgerError {}
export class LedgerNotAvailableError extends LedgerError {}
export class LedgerNotSupportedVersionError extends LedgerError {}
export class LedgerInvalidDerivationPathError extends LedgerError {}
export class LedgerTimeoutError extends LedgerError {}
export class LedgerUnknownError extends LedgerError {}

export function parseLedgerError(error: any): LedgerError {
  if (error.message && error.message === "Invalid status 6985") {
    return new LedgerConfirmationRejectedError();
  } else if (error.statusCode && error.statusCode === 27013) {
    // Newer EthApp Firmware
    return new LedgerConfirmationRejectedError();
  } else if (error.message && error.message === "Invalid status 6a80") {
    return new LedgerContractsDisabledError();
  } else if (error.statusCode && error.statusCode === 27264) {
    // Newer EthApp Firmware
    return new LedgerContractsDisabledError();
  } else if (
    error.message === "Sign failed" &&
    error.metaData &&
    error.metaData.type === "TIMEOUT"
  ) {
    return new LedgerTimeoutError();
  } else if (error.message && error.message === "U2F TIMEOUT") {
    // Newer EthApp Firmware
    return new LedgerTimeoutError();
  } else if (error.statusCode && error.statusCode === 26628) {
    // Newer EthApp Firmware
    return new LedgerLockedError();
  } else {
    return new LedgerUnknownError();
  }
}
