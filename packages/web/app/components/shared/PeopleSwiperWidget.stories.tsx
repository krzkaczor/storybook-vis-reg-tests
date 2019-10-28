import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import Container from "reactstrap/lib/Container";

import { aga, marcin, panor, sergiej, ula, zoe } from "../../../test/fixtures/fixturesPersons";
import { PeopleSwiperWidgeLayout } from "./PeopleSwiperWidget";

storiesOf("PeopleSwiperWidget", module)
  .add("2 persons", () => {
    const people = [zoe, marcin];
    return (
      <Container>
        <PeopleSwiperWidgeLayout people={people} showPersonModal={action("showPersonModal")} />
      </Container>
    );
  })
  .add("3 persons", () => {
    const people = [zoe, marcin, aga];
    return (
      <Container>
        <PeopleSwiperWidgeLayout people={people} showPersonModal={action("showPersonModal")} />
      </Container>
    );
  })
  .add("4 persons", () => {
    const people = [zoe, marcin, aga, sergiej];
    return (
      <Container>
        <PeopleSwiperWidgeLayout people={people} showPersonModal={action("showPersonModal")} />
      </Container>
    );
  })
  .add("5 persons", () => {
    const people = [zoe, marcin, aga, sergiej, panor];
    return (
      <Container>
        <PeopleSwiperWidgeLayout people={people} showPersonModal={action("showPersonModal")} />
      </Container>
    );
  })
  .add("6 persons", () => {
    const people = [zoe, marcin, aga, sergiej, panor, ula];
    return (
      <Container>
        <PeopleSwiperWidgeLayout people={people} showPersonModal={action("showPersonModal")} />
      </Container>
    );
  });
