import { IAppState } from "../../store";

export const selectDownloadAgrementModalIsOpen = (state: IAppState): boolean =>
  state.portfolioDownloadAgreementsModal.isOpen;

export const selectDownloadAgreementModalEtoId = (state: IAppState): string | undefined =>
  state.portfolioDownloadAgreementsModal.etoId;

export const selectDownloadAgreementModalIsRetailEto = (state: IAppState): boolean | undefined =>
  state.portfolioDownloadAgreementsModal.isRetailEto;
