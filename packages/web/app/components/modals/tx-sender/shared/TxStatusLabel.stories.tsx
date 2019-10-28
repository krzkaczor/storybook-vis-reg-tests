import { storiesOf } from "@storybook/react";
import * as React from "react";

import { ETxStatus } from "../types";
import { TxStatusLabel } from "./TxStatusLabel";

storiesOf("TxStatusLabel", module).add("default", () => (
  <>
    <TxStatusLabel status={ETxStatus.PENDING} />
    <br />
    <br />
    <TxStatusLabel status={ETxStatus.ERROR} />
    <br />
    <br />
    <TxStatusLabel status={ETxStatus.SUCCESS} />
  </>
));
