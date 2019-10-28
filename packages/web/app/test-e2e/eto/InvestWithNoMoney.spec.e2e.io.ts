import { ETHEREUM_ZERO_ADDRESS } from "../../config/constants";
import { goToEtoViewById } from "../eto-view/EtoViewUtils";
import { etoFixtureAddressByName } from "../utils";
import { sendEth } from "../utils/ethRpcUtils";
import { goToDashboard } from "../utils/navigation";
import { tid } from "../utils/selectors";
import { createAndLoginNewUser, loginFixtureAccount } from "../utils/userHelpers";

describe("Try and invest without money", () => {
  it("should keep invest button disabled", () => {
    const PUBLIC_ETO_ID = etoFixtureAddressByName("ETOInPublicState");
    createAndLoginNewUser({
      type: "investor",
      kyc: "business",
      clearPendingTransactions: true,
    }).then(() => {
      goToDashboard();

      // make sure that INV_EMPTY_HAS_KYC has no ether by sending ether to address 0
      // all required helper functions are available.

      // click invest now button
      cy.get(tid(`eto-overview-${PUBLIC_ETO_ID}`)).click();
      cy.get(tid("eto-invest-now-button-" + PUBLIC_ETO_ID)).click();

      cy.get(tid("invest-modal-eth-field"))
        .clear()
        .type("10");

      cy.wait(1000);

      cy.get(tid("invest-modal-invest-now-button")).should("be.disabled");
    });
  });

  it("should show error message when there is no enough ether for gas during neur investment", () => {
    const fixture = "INV_ETH_EUR_ICBM_M_HAS_KYC_DUP_HAS_NEUR_AND_NO_ETH";

    sendEth(fixture, ETHEREUM_ZERO_ADDRESS, "all");

    const PUBLIC_ETO_ID = etoFixtureAddressByName("ETOInPublicState");

    loginFixtureAccount(fixture, {
      kyc: "business",
      signTosAgreement: true,
      clearPendingTransactions: true,
    });

    goToEtoViewById(PUBLIC_ETO_ID);

    cy.get(tid("eto-invest-now-button-" + PUBLIC_ETO_ID)).click();

    cy.get(tid("investment-type.selector.ICBM_NEUR")).check({ force: true });

    cy.get(tid("invest-modal-eur-field"))
      .clear()
      .type("1000");

    cy.get(tid("form.euroValue.error-message")).should("exist");
    cy.get(tid("invest-modal-invest-now-button")).should("be.disabled");
  });
});
