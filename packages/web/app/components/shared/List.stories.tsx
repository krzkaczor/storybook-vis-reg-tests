import { storiesOf } from "@storybook/react";
import * as React from "react";

import { List } from "./List";

storiesOf("List", module).add("default", () => <List items={["First item", "Second item"]} />);
