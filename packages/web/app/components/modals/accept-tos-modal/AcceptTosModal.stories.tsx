import { storiesOf } from "@storybook/react";
import * as React from "react";

import { withModalBody } from "../../../utils/storybookHelpers.unsafe";
import { AcceptTosModalComponent } from "./AcceptTosModal";

const data = {
  isOpen: true,
  onAccept: () => {},
  onDownloadTos: () => {},
  onLogout: () => {},
  agreementChanged: false,
};

storiesOf("AcceptTosModal", module)
  .addDecorator(withModalBody())
  .add("Accept Tos", () => <AcceptTosModalComponent {...data} />);
