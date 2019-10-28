import { appRoutes } from "../../appRoutes";

const parentRoute = appRoutes.etoRegister;

export const etoRegisterRoutes = {
  companyInformation: parentRoute + "/company-information",
  legalInformation: parentRoute + "/legal-information",
  keyIndividuals: parentRoute + "/key-individuals",
  productVision: parentRoute + "/product-vision",
  etoTerms: parentRoute + "/eto-terms",
  etoInvestmentTerms: parentRoute + "/eto-investment-terms",
  etoMedia: parentRoute + "/eto-media",
  etoVotingRights: parentRoute + "/eto-voting-rights",
  etoEquityTokenInfo: parentRoute + "/eto-equity-token-info",
  etoRiskAssessment: parentRoute + "/eto-risk",
};
