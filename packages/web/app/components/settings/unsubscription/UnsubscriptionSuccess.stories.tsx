import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import * as React from "react";

import { UnsubscriptionSuccessLayout } from "./UnsubscriptionSuccess";

storiesOf("Unsubscription/Success", module).add("default", () => (
  <UnsubscriptionSuccessLayout goToHome={action("GO_TO_HOME")} />
));
