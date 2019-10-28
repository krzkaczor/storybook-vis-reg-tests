import { storiesOf } from "@storybook/react";
import * as React from "react";

import { ToBeAnnouncedTooltip } from "./ToBeAnnouncedTooltip";

storiesOf("ToBeAnnouncedTooltip", module).add("default", () => (
  <ToBeAnnouncedTooltip isOpen={true} />
));
