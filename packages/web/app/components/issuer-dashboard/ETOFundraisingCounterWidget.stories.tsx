import { storiesOf } from "@storybook/react";
import * as moment from "moment";
import React from "react";

import { testEto } from "../../../test/fixtures";
import {
  EETOStateOnChain,
  IEtoContractData,
  TEtoWithCompanyAndContract,
} from "../../modules/eto/types";
import { withMockedDate } from "../../utils/storybookHelpers.unsafe";
import { ETOFundraisingCounterWidget } from "./ETOFundraisingCounterWidget";

const dummyNow = new Date(2018, 11, 17);
const date = moment
  .utc(dummyNow)
  .add(2, "day")
  .add(1, "hours")
  .add(37, "minutes");

const presaleEto: TEtoWithCompanyAndContract = {
  ...testEto,
  contract: {
    ...testEto.contract,
    timedState: EETOStateOnChain.Whitelist,
    startOfStates: {
      ...testEto.contract!.startOfStates,
      [EETOStateOnChain.Public]: date.toDate(),
    },
  } as IEtoContractData,
};

const publicEto: TEtoWithCompanyAndContract = {
  ...testEto,
  contract: {
    ...testEto.contract,
    timedState: EETOStateOnChain.Public,
    startOfStates: {
      ...testEto.contract!.startOfStates,
      [EETOStateOnChain.Signing]: date.toDate(),
    },
  } as IEtoContractData,
};

storiesOf("ETOFundraisingCounterWidget", module)
  .addDecorator(withMockedDate(dummyNow))
  .add("presale", () => <ETOFundraisingCounterWidget eto={presaleEto} />)
  .add("public", () => <ETOFundraisingCounterWidget eto={publicEto} />);
