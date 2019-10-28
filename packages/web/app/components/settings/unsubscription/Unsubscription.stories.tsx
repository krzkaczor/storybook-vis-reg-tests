import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import * as React from "react";

import { UnsubscriptionInvalidLayout, UnsubscriptionLayout } from "./Unsubscription";

const defaultProps: React.ComponentProps<typeof UnsubscriptionLayout> = {
  email: "storybook@neufund.org",
  unsubscriptionLink: "http://link.com",
  unsubscribe: action("UNSUBSCRIBE"),
  goToHome: action("GO_TO_HOME"),
};

storiesOf("Unsubscription/Default", module)
  .add("confirmation", () => <UnsubscriptionLayout {...defaultProps} />)
  .add("invalid link", () => <UnsubscriptionInvalidLayout {...defaultProps} />);
