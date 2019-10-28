import { createActionFactory } from "@neufund/shared";

export const portfolioActions = {
  // public actions
  showDownloadAgreementModal: createActionFactory(
    "PORTFOLIO_SHOW_DOWNLOAD_AGREEMENTS_MODAL",
    (etoId: string, isRetailEto: boolean) => ({
      etoId,
      isRetailEto,
    }),
  ),
  hideDownloadAgreementModal: createActionFactory("PORTFOLIO_HIDE_DOWNLOAD_AGREEMENTS_MODAL"),
};
