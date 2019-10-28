import { storiesOf } from "@storybook/react";
import * as React from "react";

import { PersonalAccountDetailsLayout } from "./PersonalAccountDetails";

const personalData = {
  firstName: "Jane",
  lastName: "Arki",
  street: "Bernauer Strasse 18a",
  city: "Berlin",
  birthDate: "12-12-1995",
  zipCode: "12134",
  country: "PL",
  isHighIncome: true,
};

storiesOf("PersonalAccountDetails", module).add("default", () => (
  <PersonalAccountDetailsLayout personalData={personalData} />
));
