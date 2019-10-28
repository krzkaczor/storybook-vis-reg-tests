import {
  assertLanding,
  assertUserInBrowserWalletLoginPage,
  assertUserInLedgerWalletLoginPage,
  assertUserInLightWalletLoginPage,
  assertUserInLightWalletRegisterPage,
  assertUserInRecoveryPage,
} from "../utils/index";

describe("Authentication Routing", () => {
  it("should open login with light wallet", () => {
    cy.visit("/login");
    assertUserInLightWalletLoginPage();
  });

  it("should open register with light wallet", () => {
    cy.visit("/register");
    assertUserInLightWalletRegisterPage();
  });

  it("should redirect to login from /eto/login", () => {
    cy.visit("/eto/login");
    assertUserInLightWalletLoginPage();
  });

  it("should redirect to login from /nominee/login", () => {
    cy.visit("/nominee/login");
    assertUserInLightWalletLoginPage();
  });

  it("should redirect to /restore from /eto/restore", () => {
    cy.visit("/eto/restore");
    assertUserInRecoveryPage();
  });

  it("should redirect to /restore from /nominee/restore", () => {
    cy.visit("/nominee/restore");
    assertUserInRecoveryPage();
  });

  it("should open activation link with light wallet when wallet type is unknown", () => {
    cy.visit(
      "/email-verify?code=8ce11ded-e1ff-4bfa-b05a-87ea119474ff&email=0xfcd9b%40neufund.org&user_type=issuer&wallet_type=unknown",
    );
    assertUserInLightWalletLoginPage();
  });

  it("should open activation link with light wallet", () => {
    cy.visit(
      "/email-verify?code=8ce11ded-e1ff-4bfa-b05a-87ea119474ff&email=0xfcd9b%40neufund.org&user_type=issuer&wallet_type=light",
    );
    assertUserInLightWalletLoginPage();
  });

  it("should open activation link with browser wallet", () => {
    cy.visit(
      "/email-verify?code=8ce11ded-e1ff-4bfa-b05a-87ea119474ff&email=0xfcd9b%40neufund.org&user_type=issuer&wallet_type=browser",
    );
    assertUserInBrowserWalletLoginPage();
  });

  it("should open activation link with ledger wallet", () => {
    cy.visit(
      "/email-verify?code=8ce11ded-e1ff-4bfa-b05a-87ea119474ff&email=0xfcd9b%40neufund.org&user_type=issuer&wallet_type=ledger",
    );
    assertUserInLedgerWalletLoginPage();
  });

  it("should redirect to root page if the link is wrong", () => {
    cy.visit("/haha-im-a-wrong-link");
    assertLanding();
  });
});
