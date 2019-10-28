import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import * as React from "react";

import { ENomineeRequestStatus } from "../../../../../modules/nominee-flow/types";
import { Panel } from "../../../../shared/Panel";
import { PendingNomineesComponent } from "./ChooseNominee";
import { NoPendingNomineesComponent } from "./CopyEtoIdComponent";

storiesOf("Issuer Nominee Flow", module)
  .addDecorator(story => <Panel>{story()}</Panel>)
  .add("no pending requests", () => (
    <NoPendingNomineesComponent issuerId={"0x111111111111111111"} />
  ))
  .add("request pending", () => {
    const nomineeRequests = [
      {
        state: ENomineeRequestStatus.PENDING,
        nomineeId: "12345789",
        etoId: "12346579",
        insertedAt: "string",
        updatedAt: "123",
        metadata: {
          city: "Berlin",
          country: "De",
          jurisdiction: "de",
          legalForm: "gmbh",
          legalFormType: "bla",
          name: "NeuMini",
          registrationNumber: "123",
          street: "Cuvrystr",
          zipCode: "98745",
        },
      },
    ];

    return (
      <PendingNomineesComponent
        nomineeRequests={nomineeRequests}
        acceptNominee={action("acceptNominee")}
        rejectNominee={action("rejectNominee")}
      />
    );
  });
