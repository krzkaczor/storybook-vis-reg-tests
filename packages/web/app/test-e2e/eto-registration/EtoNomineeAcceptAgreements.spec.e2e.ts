import { assertNomineeAgreementsSigningFlow } from "../nominee-flow/NomineeFlowUtils";
import { goToIssuerDashboard } from "../utils/navigation";
import { loginFixtureAccount, logout } from "../utils/userHelpers";
import {
  assertSetEtoStartDateStep,
  assertWaitForNomineeAgreementsStep,
} from "./EtoRegistrationUtils";

describe("Eto Nominee accepts agreements", function(): void {
  it("should go through agreements signing process on both issuer and nominee sides", () => {
    loginFixtureAccount("ISSUER_SETUP_NO_ST", {
      kyc: "business",
      signTosAgreement: true,
      clearPendingTransactions: true,
    });

    goToIssuerDashboard();

    assertWaitForNomineeAgreementsStep();

    cy.saveLocalStorage("ISSUER_SETUP_NO_ST");

    logout();

    assertNomineeAgreementsSigningFlow();

    cy.restoreLocalStorage("ISSUER_SETUP_NO_ST");

    goToIssuerDashboard();

    assertSetEtoStartDateStep();
  });
});
