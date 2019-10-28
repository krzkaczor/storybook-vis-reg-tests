import { kycRoutes } from "../../components/kyc/routes";
import { goThroughKycCorporateProcess } from "../utils/index";
import { tid } from "../utils/selectors";
import { createAndLoginNewUser } from "../utils/userHelpers";

describe("KYC Small Business flow with manual verification", () => {
  it("went through KYC Small Business flow", () => {
    createAndLoginNewUser({ type: "investor" }).then(() => {
      // go to corporate start page
      cy.visit(kycRoutes.start);
      cy.get(tid("kyc-start-go-to-company")).awaitedClick();

      goThroughKycCorporateProcess();

      // panel should now be in pending state
      cy.get(tid("kyc-panel-pending"));
    });
  });
});
