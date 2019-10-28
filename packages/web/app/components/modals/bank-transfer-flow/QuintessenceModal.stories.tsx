import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import * as React from "react";

import { QuintessenceModal } from "./QuintessenceModal";

storiesOf("QuintessenceModal", module).add("default", () => (
  <QuintessenceModal isOpen={true} onClose={action("onClose")}>
    <p className="text-center">Modal Content Here</p>
  </QuintessenceModal>
));
