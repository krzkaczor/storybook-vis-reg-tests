import { storiesOf } from "@storybook/react";
import * as React from "react";

import { PrivateKeyDisplay } from "./PrivateKeyDisplay";

const privateKey = "b8c9391742bcf13c2efe56aa8d158ff8b50191a11d9fe5021d8b31cd86f96f46";

storiesOf("Templates/PrivateKeyDisplay", module).add("default", () => (
  <PrivateKeyDisplay privateKey={privateKey} />
));
