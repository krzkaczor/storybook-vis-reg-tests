import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import * as React from "react";

import { accountMenuData } from "../MenuData";
import { MobileMenuInternalLayout } from "./MobileMenuInternal";

const issuerData = accountMenuData(false, action("logout"));

storiesOf("Mobile menu", module).add("default", () => (
  <MobileMenuInternalLayout data={issuerData} />
));
