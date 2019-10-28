import { storiesOf } from "@storybook/react";
import * as React from "react";

import { FancyRenderTimeLeft, RenderTimeLeft } from "./TimeLeft.unsafe";

const minute = 60;
const hour = minute * 60;
const day = hour * 24;

const daysHours = 5 * day + 3 * hour + 11;
const daysOnly = 5 * day + 11;
const hours = 15 * hour + 17 * minute;
const minutes = 5 * minute;
const seconds = 56;
const none = 0;

storiesOf("RenderTimeLeft", module)
  .add("days hours", () => <RenderTimeLeft timeLeft={daysHours} />)
  .add("days only", () => <RenderTimeLeft timeLeft={daysOnly} />)
  .add("hours", () => <RenderTimeLeft timeLeft={hours} />)
  .add("minutes", () => <RenderTimeLeft timeLeft={minutes} />)
  .add("seconds", () => <RenderTimeLeft timeLeft={seconds} />)
  .add("none", () => <RenderTimeLeft timeLeft={none} />);

storiesOf("FancyRenderTimeLeft", module)
  .add("days hours", () => <FancyRenderTimeLeft timeLeft={daysHours} />)
  .add("days only", () => <FancyRenderTimeLeft timeLeft={daysOnly} />)
  .add("hours", () => <FancyRenderTimeLeft timeLeft={hours} />)
  .add("minutes", () => <FancyRenderTimeLeft timeLeft={minutes} />)
  .add("seconds", () => <FancyRenderTimeLeft timeLeft={seconds} />)
  .add("none", () => <FancyRenderTimeLeft timeLeft={none} />);
