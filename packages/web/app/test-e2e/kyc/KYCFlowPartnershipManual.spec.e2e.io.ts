import { kycRoutes } from "../../components/kyc/routes";
import { confirmAccessModal } from "../utils";
import { fillForm } from "../utils/forms";
import { tid } from "../utils/selectors";
import { createAndLoginNewUser } from "../utils/userHelpers";
import {
  kycCompanyDocsForm,
  kycCompanyForm,
  kycLegalRepDocsForm,
  kycLegalRepForm,
} from "./fixtures";

describe("KYC Small Business flow with manual verification", () => {
  it("went through KYC Small Business flow", () => {
    createAndLoginNewUser({ type: "investor" }).then(() => {
      // go to partnership page
      cy.visit(kycRoutes.start);
      cy.get(tid("kyc-start-go-to-company")).awaitedClick();
      cy.url().should("contain", kycRoutes.businessData);

      // fill out and submit business form
      fillForm(kycCompanyForm);
      fillForm(kycCompanyDocsForm);

      // fill out and submit legal rep forms
      fillForm(kycLegalRepForm);
      fillForm(kycLegalRepDocsForm);

      // accept the wallet
      confirmAccessModal();

      // panel should now be in pending state
      cy.get(tid("kyc-panel-pending"));
    });
  });
});
