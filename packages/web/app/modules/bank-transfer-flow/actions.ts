import { createActionFactory } from "@neufund/shared";

import { EBankTransferType } from "./reducer";

export const bankTransferFLowActions = {
  // public actions
  startBankTransfer: createActionFactory("BANK_TRANSFER_FLOW_START", (type: EBankTransferType) => ({
    type,
  })),
  stopBankTransfer: createActionFactory("BANK_TRANSFER_FLOW_STOP"),

  downloadNEurTokenAgreement: createActionFactory("BANK_TRANSFER_DOWNLOAD_TOKEN_AGREEMENT"),
  getRedeemData: createActionFactory("BANK_TRANSFER_GET_REDEEM_DATA"),

  // private actions
  continueProcessing: createActionFactory("BANK_TRANSFER_FLOW_CONTINUE_PROCESSING"),

  continueToAgreement: createActionFactory("BANK_TRANSFER_FLOW_CONTINUE_TO_AGREEMENT"),
  continueToSummary: createActionFactory("BANK_TRANSFER_FLOW_CONTINUE_TO_SUMMARY"),
  continueToSuccess: createActionFactory("BANK_TRANSFER_FLOW_CONTINUE_TO_SUCCESS"),

  generateBankTransferReference: createActionFactory("BANK_TRANSFER_FLOW_GENERATE_REFERENCE"),
  showBankTransferDetails: createActionFactory("BANK_TRANSFER_FLOW_DETAILS"),
  showBankTransferSummary: createActionFactory("BANK_TRANSFER_FLOW_SUMMARY"),

  setTransferDetails: createActionFactory(
    "BANK_TRANSFER_FLOW_SET_DETAILS",
    (type: EBankTransferType, minEuroUlps: string, reference: string) => ({
      type,
      minEuroUlps,
      reference,
    }),
  ),
  setRedeemData: createActionFactory(
    "BANK_TRANSFER_SET_REDEEM_DATA",
    (redeemBankFeeUlps: string, redeemMinEuroUlps: string) => ({
      redeemBankFeeUlps,
      redeemMinEuroUlps,
    }),
  ),
};
