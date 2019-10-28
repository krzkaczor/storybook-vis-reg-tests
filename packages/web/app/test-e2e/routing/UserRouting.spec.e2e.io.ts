import { assertDashboard } from "../utils";
import { createAndLoginNewUser } from "../utils/userHelpers";

describe("User routing", () => {
  it("should redirect to dashboard for unsupported routes", () => {
    createAndLoginNewUser({ type: "investor" }).then(() => {
      // redirect from root
      cy.visit("/");
      assertDashboard();

      // redirect from unknown url
      cy.visit("/unknown-url");
      assertDashboard();
    });
  });
});
