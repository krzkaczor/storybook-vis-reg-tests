import { expect } from "chai";
import { mount } from "enzyme";
import { Formik } from "formik";
import * as React from "react";

import { wrapWithIntl } from "../../../../../test/integrationTestUtils.unsafe";
import { InvestmentCalculator } from "./InvestmentTerms";

describe("<InvestmentCalculator />", () => {
  const eto = {
    preMoneyValuationEur: "125000000",
    existingShareCapital: "40859",
    newShareNominalValue: "1",
    newSharesToIssue: "2952",
    minimumNewSharesToIssue: "1000",
    newSharesToIssueInFixedSlots: "2252",
    fixedSlotsMaximumDiscountFraction: "60",
    whitelistDiscountFraction: "40",
  };

  const component = mount(
    wrapWithIntl(
      <Formik initialValues={eto} onSubmit={() => {}}>
        <InvestmentCalculator etoProductMaxInvestmentAmount={5000000} />
      </Formik>,
    ),
  ).render();

  // Values taken from EtoUtils.spec.ts
  expect(
    component
      .find('[name="newSharePrice"]')
      .first()
      .prop("value"),
  ).eq("3 059.30");
  expect(
    component
      .find('[name="totalInvestment"]')
      .first()
      .prop("value"),
  ).eq("4 897 329.84");
  expect(
    component
      .find('[name="minInvestmentAmount"]')
      .last()
      .prop("value"),
  ).eq("3 059 301.50");
});
