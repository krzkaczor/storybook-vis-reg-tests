import { storiesOf } from "@storybook/react";
import * as React from "react";

import { Panel } from "../shared/Panel";
import { Container, EColumnSpan, EContainerType } from "./Container";
import { WidgetGrid } from "./WidgetGrid";

storiesOf("WidgetGrid", module)
  .add("default", () => (
    <WidgetGrid>
      <Panel>3 columns</Panel>
      <Panel columnSpan={EColumnSpan.THREE_COL}>3 columns</Panel>
      <Panel columnSpan={EColumnSpan.ONE_COL}>1 column</Panel>
      <Panel columnSpan={EColumnSpan.ONE_COL}>1 column</Panel>
      <Panel columnSpan={EColumnSpan.ONE_COL}>1 column</Panel>
      <Panel columnSpan={EColumnSpan.ONE_AND_HALF_COL}>1.5 columns</Panel>
      <Panel columnSpan={EColumnSpan.ONE_AND_HALF_COL}>1.5 columns</Panel>
      <Panel columnSpan={EColumnSpan.TWO_COL}>2 columns</Panel>
      <Panel columnSpan={EColumnSpan.ONE_COL}>1 column</Panel>
    </WidgetGrid>
  ))
  .add("with containers", () => (
    <WidgetGrid>
      <Container columnSpan={EColumnSpan.TWO_COL} type={EContainerType.INHERIT_GRID}>
        <Panel columnSpan={EColumnSpan.TWO_COL}>2 columns in a container</Panel>
        <Panel columnSpan={EColumnSpan.ONE_COL}>1 column in a container</Panel>
      </Container>
      <Container columnSpan={EColumnSpan.ONE_COL} type={EContainerType.INHERIT_GRID}>
        <Panel columnSpan={EColumnSpan.ONE_COL}>1 column in a container</Panel>
        <Panel columnSpan={EColumnSpan.ONE_COL}>1 column in a container</Panel>
      </Container>
    </WidgetGrid>
  ));
