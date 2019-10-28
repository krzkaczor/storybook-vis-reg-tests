import {
  acceptTOS,
  assertButtonIsActive,
  assertDashboard,
  assertErrorModal,
  assertWaitForLatestEmailSentWithSalt,
  generateRandomEmailAddress,
  lightWalletTypeRegistrationInfo,
  loginWithLightWallet,
  logoutViaAccountMenu,
  registerWithLightWallet,
  tid,
  verifyLatestUserEmail,
} from "../utils/index";

describe("Light wallet login / register", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it("should register user with light-wallet and send email", () => {
    const email = generateRandomEmailAddress();
    const password = "strongpassword";

    registerWithLightWallet(email, password);

    assertWaitForLatestEmailSentWithSalt(email);
  });

  it("should remember light wallet details after logout", () => {
    const email = generateRandomEmailAddress();
    const password = "strongpassword";

    registerWithLightWallet(email, password);

    logoutViaAccountMenu();

    loginWithLightWallet(email, password);

    assertDashboard();
  });

  it("should recognize correctly ETO user and save metadata correctly", () => {
    const email = generateRandomEmailAddress();
    const password = "strongpassword";

    // todo: we should let to register as issuer here so mock is not needed
    registerWithLightWallet(email, password);

    logoutViaAccountMenu();

    loginWithLightWallet(email, password);

    assertDashboard().then(() => {
      const savedMetadata = (window.localStorage as any).NF_WALLET_METADATA;
      cy.clearLocalStorage().then(() => {
        // mock issuer metadata
        const mockedMetadata = JSON.parse(savedMetadata);
        mockedMetadata.userType = "issuer";
        (window.localStorage as any).NF_WALLET_METADATA = JSON.stringify(mockedMetadata);

        cy.visit("eto/login/light");
        // investor metadata woud be cleared here
        cy.contains(tid("light-wallet-login-with-email-email-field"), email);
        cy.get(tid("light-wallet-login-with-email-password-field")).type(password);
        cy.get(tid("wallet-selector-nuewallet.login-button")).awaitedClick();

        assertDashboard().then(() => {
          //after login investor metadata are again saved into local storage
          expect((window.localStorage as any).NF_WALLET_METADATA).to.be.deep.eq(savedMetadata);
        });
      });
    });
  });

  it("should wipe out saved investor wallet when on issuer login", () => {
    const email = generateRandomEmailAddress();
    const password = "strongpassword";

    // todo: we should let to register as issuer here so mock is not needed
    registerWithLightWallet(email, password);

    logoutViaAccountMenu();

    loginWithLightWallet(email, password);

    assertDashboard().then(() => {
      cy.clearLocalStorage().then(() => {
        cy.visit("eto/login/light");
        // investor metadata woud be cleared here
        expect((window.localStorage as any).NF_WALLET_METADATA).to.not.exist;
      });
    });
  });

  it("should return an error when logging with same email", () => {
    const email = generateRandomEmailAddress();
    const password = "strongpassword";

    // register once and then verify email account
    cy.visit("/register");
    lightWalletTypeRegistrationInfo(email, password);
    assertDashboard();
    acceptTOS();
    verifyLatestUserEmail(email);
    logoutViaAccountMenu();
    cy.clearLocalStorage();

    // register again with the same email, this should show a warning
    cy.visit("/register");
    lightWalletTypeRegistrationInfo(email, password);
    assertErrorModal();

    //dismiss warning, register button must be enabled
    cy.get(tid("generic-modal-dismiss-button")).awaitedClick();
    assertButtonIsActive("wallet-selector-register-button");
  });

  // This test case is commented due to cypressjs bugs which occurs while reusing cy.visit
  /**
  it("should recover vault from email", () => {
    const email = "moe3@test.com";
    const password = "strongpassword";

    cy.request({ url: mockApiUrl + "sendgrid/session/mails", method: "DELETE" });

    registerWithLightWallet(email, password);

    cy.get(tid("Header-logout")).awaitedClick();
    cy.clearLocalStorage();

    cy.writeFile('/tmp/cypress-outout.log', 'test!')

    cy.request({ url: mockApiUrl + "sendgrid/session/mails", method: "GET" }).then(r => {
      cy.writeFile('/tmp/cypress-outout.log', 'test2!')
      cy.writeFile('/tmp/cypress-outout.log', r.body)

      cy.exec(`echo '${JSON.stringify(r.body)}' > /tmp/test.txt`);
      cy.log(`echo '${JSON.stringify(r.body)}' > /tmp/test.txt`);

      const emailLinkVerification = get(
        r,
        `body[0].template_vars.login_link`,
      );
      const emailLinkVerificationWithFixedDomain = emailLinkVerification.replace(
        process.env.NF_REMOTE_BACKEND_PROXY_ROOT!.replace("api/", ""),
        "https://localhost:9090/",
      );

      cy.visit(emailLinkVerificationWithFixedDomain);

      cy.get(tid("light-wallet-login-with-email-email-field")).should("contain", email);
      cy.get(tid("light-wallet-login-with-email-password-field")).type(password + "{enter}");

      cy.url().should("contain", "/dashboard");
    });
  });*/
});
