import { etherscanAddressLink } from "../../components/appRouteUtils";
import { etoFixtureAddressByName, tid } from "../utils";
import { assertIsExternalLink } from "../utils/assertions";
import { createAndLoginNewUser, shouldDownloadDocument } from "../utils/index";
import { goToEtoViewById, goToIssuerEtoView } from "./EtoViewUtils";

const assertIsNonClickableTag = (testId: string) =>
  cy.get(tid(testId) + tid("tag.non-clickable")).should("exist");

describe("Eto view widget", () => {
  it("should render tags correctly when all documents are available and eto is on chain", () => {
    const etoId = etoFixtureAddressByName("ETOInSetupState");

    goToEtoViewById(etoId);

    assertIsExternalLink("eto-overview-pitch-deck-button");

    cy.get(tid("eto-overview-pitch-deck-button")).should("have.attr", "href");

    shouldDownloadDocument("eto-overview-term-sheet-button", "Signed Termsheet.pdf");

    shouldDownloadDocument(
      "eto-overview-prospectus-approved-button",
      "Approved Offering Document.pdf",
    );

    assertIsExternalLink("eto-overview-smart-contract-on-chain-button");

    cy.get(tid("eto-overview-smart-contract-on-chain-button")).should(
      "have.attr",
      "href",
      etherscanAddressLink(etoId),
    );
  });

  it("should render tags as non clickable when documents and pitch are not available and eto is not on chain", () => {
    createAndLoginNewUser({ type: "issuer", kyc: "business" });

    goToIssuerEtoView();

    assertIsNonClickableTag("eto-overview-pitch-deck-button");

    assertIsNonClickableTag("eto-overview-term-sheet-button");

    assertIsNonClickableTag("eto-overview-prospectus-approved-button");

    assertIsNonClickableTag("eto-overview-smart-contract-on-chain-button");
  });
});
