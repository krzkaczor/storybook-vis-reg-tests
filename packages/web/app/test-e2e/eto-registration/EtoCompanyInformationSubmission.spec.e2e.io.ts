import { assertIssuerDashboard } from "../utils/assertions";
import { cyPromise } from "../utils/cyPromise";
import { checkField, fillForm } from "../utils/forms";
import { createAndLoginNewUser } from "../utils/userHelpers";
import {
  goToCompanyInformation,
  goToLegalInformation,
  patchIssuerCompany,
} from "./EtoRegistrationUtils";
import { aboutFormRequired, aboutFormSubmit } from "./fixtures";

const companyLegalDescriptionExpectedValue = "Sunt elogiumes fallere camerarius, emeritis tabeses.";

const simulateCompanyLegalDescriptionModification = () => {
  cyPromise(() =>
    patchIssuerCompany({
      companyLegalDescription: companyLegalDescriptionExpectedValue,
    }),
  );
};

const assertCompanyLegalDescriptionValue = () => {
  goToLegalInformation();

  checkField("companyLegalDescription", companyLegalDescriptionExpectedValue);
};

describe("Eto Company Information Field Submission", function(): void {
  it("should not overwrite whole company profile", () => {
    createAndLoginNewUser({ type: "issuer", kyc: "business" });

    goToCompanyInformation();

    simulateCompanyLegalDescriptionModification();

    fillForm({
      ...aboutFormRequired,
      ...aboutFormSubmit,
    });

    assertIssuerDashboard();

    assertCompanyLegalDescriptionValue();
  });
});
