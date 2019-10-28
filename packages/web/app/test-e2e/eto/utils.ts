import { find } from "lodash";

import { goToEtoViewById } from "../eto-view/EtoViewUtils";
import { tid } from "../utils";

const ETOS_PATH = "/api/eto-listing/etos";
export const waitUntilEtoIsInState = async (etoId: string, state: string) => {
  while (true) {
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await fetch(ETOS_PATH, {
      headers,
      method: "GET",
    });
    const etosJson = await response.json();
    const eto = find(etosJson, item => item.eto_id === etoId);
    if (eto.state === state && eto.start_date) {
      break;
    }
  }
};

export const assertInvestmentModal = () => {
  cy.get(tid("modals.investment.modal")).should("exist");
};

export const startInvestmentFlow = (etoId: string) => {
  goToEtoViewById(etoId);

  cy.get(tid("eto-invest-now-button-" + etoId)).click();

  assertInvestmentModal();
};
