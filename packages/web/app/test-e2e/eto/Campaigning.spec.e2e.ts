import { etoPublicViewByIdLinkLegacy, etoPublicViewLink } from "../../components/appRouteUtils";
import { formatThousands } from "../../components/shared/formatters/utils";
import { fillForm } from "../utils/forms";
import {
  assertRegister,
  confirmAccessModal,
  etoFixtureAddressByName,
  goToIssuerDashboard,
} from "../utils/index";
import { tid } from "../utils/selectors";
import {
  createAndLoginNewUser,
  getEto,
  loginFixtureAccount,
  logout,
  makeAuthenticatedCall,
} from "../utils/userHelpers";

const submitBookBuilding = (
  amount: string,
  consentToRevealEmail: boolean,
  shouldConfirmModal: boolean = true,
) => {
  fillForm({
    amount,
    consentToRevealEmail: {
      type: "toggle",
      checked: consentToRevealEmail,
    },
    "eto-bookbuilding-commit": {
      type: "submit",
    },
  });

  if (shouldConfirmModal) {
    confirmAccessModal();
  }

  cy.get(tid("campaigning-your-commitment")).contains(`${formatThousands(amount)} EUR`);
};

const changeBookBuilding = () => cy.get(tid("campaigning-your-commitment-change")).click();

const deleteBookBuilding = () => {
  cy.get(tid("campaigning-your-commitment-delete")).click();
  cy.get(tid("campaigning-your-commitment")).should("not.exist");
};

const PLEDGE_AMOUNT = "1000";
const CHANGED_AMOUNT = "1500";

describe("Eto campaigning state", () => {
  it("should show Register button when not logged in", () => {
    const ETO_ID = etoFixtureAddressByName("ETONoStartDate");

    cy.visit(etoPublicViewByIdLinkLegacy(ETO_ID));
    cy.get(tid("eto.public-view")).should("exist");

    cy.get(tid("logged-out-campaigning-register")).awaitedClick();

    assertRegister();
  });

  it("should allow to pledge by investor", () => {
    // eto ID must match issuer SEED below
    const ETO_ID = etoFixtureAddressByName("ETOInSetupState");

    loginFixtureAccount("ISSUER_SETUP", {
      kyc: "business",
      permissions: ["do-bookbuilding"],
    }).then(() =>
      // make sure bookbuilding is off (especially after CI retry)
      makeAuthenticatedCall("/api/eto-listing/etos/me/bookbuilding", {
        method: "PUT",
        body: JSON.stringify({
          is_bookbuilding: false,
        }),
      }).then(() => {
        goToIssuerDashboard();

        cy.get(tid("eto-state-countdown_to_public_sale")).should("exist");

        cy.get(tid("eto-flow-start-bookbuilding")).awaitedClick();

        cy.get(tid("eto-state-whitelisting")).should("exist");

        logout();

        createAndLoginNewUser({
          type: "investor",
          kyc: "business",
        });

        cy.visit(etoPublicViewByIdLinkLegacy(ETO_ID));

        cy.wait(5000); //let the store get the ETO data, otherwise this place is flaky

        cy.get(tid("eto-bookbuilding-remaining-slots"))
          .then($element => Number($element.text()))
          .as("remainingSlots");

        submitBookBuilding(PLEDGE_AMOUNT, true);

        cy.get<number>("@remainingSlots").then(remainingSlots => {
          // Remove one from remaining slots as it's first pledge
          cy.get(tid("eto-bookbuilding-remaining-slots")).should("contain", remainingSlots - 1);
        });

        logout();

        createAndLoginNewUser({
          type: "investor",
          kyc: "individual",
        });

        cy.visit(etoPublicViewByIdLinkLegacy(ETO_ID));

        submitBookBuilding(CHANGED_AMOUNT, false);

        cy.get<number>("@remainingSlots").then(remainingSlots => {
          // Remove two from remaining slots as it's second pledge
          cy.get(tid("eto-bookbuilding-remaining-slots")).should("contain", remainingSlots - 2);
        });
      }),
    );
  });

  it("should allow to change pledge by investor", () => {
    loginFixtureAccount("INV_ETH_EUR_ICBM_M_HAS_KYC", {
      kyc: "business",
      onlyLogin: true,
    });

    const ETO_ID = etoFixtureAddressByName("ETOInSetupState");

    cy.visit(etoPublicViewByIdLinkLegacy(ETO_ID));

    submitBookBuilding("200", true);
    changeBookBuilding();
    submitBookBuilding("160", true, false);
    deleteBookBuilding();
  });

  it("load pledge data correclty", () => {
    loginFixtureAccount("INV_ETH_EUR_ICBM_M_HAS_KYC", {
      kyc: "business",
      onlyLogin: true,
    });

    const amount = "200";
    const ETO_ID = etoFixtureAddressByName("ETOInSetupState");
    cy.visit(etoPublicViewByIdLinkLegacy(ETO_ID));

    submitBookBuilding(amount, false);

    getEto(ETO_ID).then(etoData => {
      // Preview code
      cy.visit(etoPublicViewLink(etoData.previewCode, etoData.product.jurisdiction));
      cy.get(`${tid("campaigning-your-commitment")} ${tid("value")}`).should("contain", amount);

      // from dashboard
      cy.visit("/");
      cy.get(tid(`eto-overview-${ETO_ID}`)).click();
      cy.get(`${tid("campaigning-your-commitment")} ${tid("value")}`).should("contain", amount);

      // from dashboard
      cy.visit(etoPublicViewByIdLinkLegacy(ETO_ID));
      cy.get(`${tid("campaigning-your-commitment")} ${tid("value")}`).should("contain", amount);
    });
  });
  it("loads bookbuilding data correctly", () => {
    createAndLoginNewUser({
      type: "investor",
      signTosAgreement: true,
    });

    const ETO_ID = etoFixtureAddressByName("ETOInSetupState");

    cy.server();
    cy.fixture("etoData.json").as("etoData");
    cy.fixture("bookbuildingData.json").as("bookbuildingData");
    cy.route("GET", `**/api/eto-listing/etos/${ETO_ID}`, "@etoData");
    cy.route("GET", `**/api/eto-listing/etos/${ETO_ID}/bookbuilding-stats`, "@bookbuildingData");
    cy.visit(etoPublicViewByIdLinkLegacy(ETO_ID));

    cy.get(`${tid("eto-whitelist-countdown")}`).should("exist");
  });
});
