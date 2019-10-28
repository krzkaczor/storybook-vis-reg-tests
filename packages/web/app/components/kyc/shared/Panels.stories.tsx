import { storiesOf } from "@storybook/react";
import * as React from "react";

import { Panels } from "./Panels";

storiesOf("KYC/Start", module).add("default", () => (
  <>
    <Panels
      panels={[
        {
          content: "small business",
          id: 1,
          onClick: () => {},
          "data-test-id": "kyc-start-company-go-to-small-business",
        },
        {
          content: "corporation",
          id: 2,
          onClick: () => {},
          "data-test-id": "kyc-start-business-go-to-corporation",
        },
      ]}
    />
  </>
));
