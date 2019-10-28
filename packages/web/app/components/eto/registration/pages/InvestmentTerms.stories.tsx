import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import * as React from "react";

import { testEto } from "../../../../../test/fixtures";
import { Panel } from "../../../shared/Panel";
import { EtoInvestmentTermsComponent } from "./InvestmentTerms";

const eto = testEto;

storiesOf("EtoInvestmentTerms", module)
  .addDecorator(story => <Panel>{story()}</Panel>)
  .add("default", () => (
    <EtoInvestmentTermsComponent
      eto={eto}
      savingData={false}
      loadingData={false}
      readonly={false}
      saveData={action("saveData")}
    />
  ));
