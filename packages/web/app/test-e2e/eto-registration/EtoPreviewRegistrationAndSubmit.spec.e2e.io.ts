import { goToIssuerDashboard } from "../utils/navigation";
import { tid } from "../utils/selectors";
import { createAndLoginNewUser } from "../utils/userHelpers";
import { fillRequiredCompanyInformation, submitPreview } from "./EtoRegistrationUtils";

describe("Eto Forms submit preview", function(): void {
  this.retries(2);
  it("should fill required fields and submit preview", () => {
    createAndLoginNewUser({ type: "issuer", kyc: "business" }).then(() => {
      fillRequiredCompanyInformation();

      goToIssuerDashboard();

      // should be in the preview status
      cy.get(tid("eto-state-preview")).should("exist");

      submitPreview();

      // should be in in marketing review after submitting
      cy.get(tid("eto-state-marketing_listing_in_review")).should("exist");

      // TODO: #3369 Accept marketing listing and assert that we are in setup eto state
    });
  });
});
