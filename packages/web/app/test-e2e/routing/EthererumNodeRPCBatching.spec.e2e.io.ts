import { NODE_ADDRESS } from "../config";
import { goToDashboard } from "../utils";
import { createAndLoginNewUser } from "../utils/userHelpers";

describe("Ethereum Node RPC requests batching", () => {
  it("should batch web3 requests", () => {
    cy.server();
    cy.route({
      method: "POST",
      url: NODE_ADDRESS,
    }).as("node");

    createAndLoginNewUser({ type: "investor" }).then(() => {
      goToDashboard();

      cy.get("@node").should((xhr: any) => {
        expect(xhr.requestBody).to.be.an("array");
      });
    });
  });
});
