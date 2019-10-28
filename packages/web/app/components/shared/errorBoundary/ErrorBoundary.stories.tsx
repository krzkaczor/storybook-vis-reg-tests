import { storiesOf } from "@storybook/react";
import * as React from "react";

import { ErrorBoundaryLayout } from "./ErrorBoundaryLayout";
import { ErrorBoundaryPanel } from "./ErrorBoundaryPanel";

storiesOf("ErrorBoundary", module)
  .add(" Layout", () => <ErrorBoundaryLayout />)
  .add("Panel", () => <ErrorBoundaryPanel />);
