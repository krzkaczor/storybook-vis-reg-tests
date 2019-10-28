import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import * as React from "react";

import {
  CampaigningActivatedInvestorApprovedWidgetLayout,
  CampaigningFormState,
} from "./CampaigningActivatedInvestorApprovedWidgetLayout";

storiesOf("ETO/CampaigningActivatedInvestorApprovedWidgetLayout", module)
  .add("default", () => (
    <CampaigningActivatedInvestorApprovedWidgetLayout
      pledgedAmount={"10"}
      consentToRevealEmail={true}
      backNow={action("back now")}
      formState={CampaigningFormState.VIEW}
      showMyEmail={() => {}}
      changePledge={() => {}}
      deletePledge={() => {}}
      minPledge={2}
      maxPledge={100}
    />
  ))
  .add("editing", () => (
    <CampaigningActivatedInvestorApprovedWidgetLayout
      pledgedAmount={"10"}
      consentToRevealEmail={true}
      backNow={action("back now")}
      formState={CampaigningFormState.EDIT}
      showMyEmail={() => {}}
      changePledge={() => {}}
      deletePledge={() => {}}
      minPledge={2}
      maxPledge={100}
    />
  ));
