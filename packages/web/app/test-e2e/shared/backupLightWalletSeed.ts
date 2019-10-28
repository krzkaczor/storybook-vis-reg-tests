import { confirmAccessModal, goToProfile } from "../utils";
import { tid } from "../utils/selectors";

const extractSeedFromDOM = (seed: string): string[] =>
  seed
    .replace(/\d/g, "")
    .replace(/[.]/g, " ")
    .split(" ");

const extractRandomWordIndexFromDOM = (indexArray: string): string[] =>
  indexArray.replace(/[a-z]/g, "").split(" ");

export const backupLightWalletSeedBase = (finalCheckTid?: string) => {
  confirmAccessModal();

  cy.get(tid("backup-seed-intro-button")).awaitedClick();

  cy.get(tid("seed-display-word")).then(word => {
    const firstSeed = extractSeedFromDOM(word.text());
    firstSeed.shift();

    const seed = firstSeed;
    cy.get(tid("seed-display-next-link")).awaitedClick();

    cy.get(tid("seed-verify-label")).then(randomWords => {
      const randomEnt = extractRandomWordIndexFromDOM(randomWords.text());
      randomEnt.shift();
      for (let index = 0; index < 4; index++) {
        cy.get(`${tid(`backup-seed-verify-word-${index}`)} input`)
          .type(seed[Number.parseInt(randomEnt[index], 10) - 1], { force: true, timeout: 20 })
          .type("{enter}");
      }

      cy.get(tid("seed-verify-button-next")).awaitedClick();
      cy.get(tid("generic-modal-dismiss-button")).awaitedClick();
      if (finalCheckTid) {
        cy.get(tid(finalCheckTid)).should("exist");
      }
    });
  });
};

export const backupLightWalletSeed = () => {
  goToProfile();
  cy.get(tid("backup-seed-widget-link-button")).awaitedClick();
  backupLightWalletSeedBase("backup-seed-verified-section");
};

export const backupLightWalletSeedFromAccountSetupDashboard = () => {
  cy.get(tid("backup-seed-widget-link-button")).awaitedClick();
  backupLightWalletSeedBase("account-setup-start-kyc-section");
};
