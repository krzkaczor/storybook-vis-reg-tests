import { storiesOf } from "@storybook/react";
import * as React from "react";

import { WidgetGrid } from "../../layouts/WidgetGrid";
import { ELoadingIndicator, LoadingIndicator, LoadingIndicatorContainer } from "./LoadingIndicator";

storiesOf("LoadingIndicator", module)
  .add("pulse (default)", () => <LoadingIndicator />)
  .add("blocks", () => <LoadingIndicator type={ELoadingIndicator.BLOCKS} />)
  .add("hexagon", () => <LoadingIndicator type={ELoadingIndicator.HEXAGON} />)
  .add("spinner", () => <LoadingIndicator type={ELoadingIndicator.SPINNER} />)
  .add("as container", () => (
    <WidgetGrid>
      <LoadingIndicatorContainer type={ELoadingIndicator.PULSE} />
    </WidgetGrid>
  ));
