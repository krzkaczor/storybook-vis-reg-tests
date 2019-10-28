import { appRoutes } from "../../components/appRoutes";
import { etoFixtureAddressByName, tid } from "../utils";

// TODO: get German eto id deterministically
const germanJurisdictionEto = etoFixtureAddressByName("ETOInWhitelistState");
const liJurisdictionEto = etoFixtureAddressByName("ETOInSetupState");

export const assertAllJurisdictionEtosExist = () => {
  cy.log("Tests Multi Jurisdiction when user is doesn't have any kyc");

  cy.visit(appRoutes.dashboard);

  cy.get(tid("eto-overview-" + germanJurisdictionEto)).should("exist");
  cy.get(tid("eto-overview-" + liJurisdictionEto)).should("exist");
};

export const assertFilteredDeJurisdiction = () => {
  cy.log("Tests Multi Jurisdiction when user is has LI kyc");

  cy.visit(appRoutes.dashboard);

  cy.get(tid("eto-overview-" + liJurisdictionEto)).should("exist");
  cy.get(tid("eto-overview-" + germanJurisdictionEto)).should("not.exist");
};
