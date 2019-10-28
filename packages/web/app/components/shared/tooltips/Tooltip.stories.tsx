import { storiesOf } from "@storybook/react";
import * as React from "react";

import { Tooltip } from "./Tooltip";
import { ECustomTooltipTextPosition } from "./TooltipBase";

const lorem =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, consequatur deserunt voluptatibus sapiente ducimus iusto culpa consectetur minus, voluptatum tempora nostrum quasi, rerum non facilis doloribus tempore ea obcaecati reprehenderit!";

storiesOf("Basic UI/Tooltip", module)
  .add("with icon (default)", () => <Tooltip content={lorem} isOpen={true} />)
  .add("with text", () => (
    <Tooltip content={lorem} isOpen={true}>
      Tooltip on hover
    </Tooltip>
  ))
  .add("with text and right position", () => (
    <Tooltip content={lorem} isOpen={true} placement="right">
      Tooltip on hover
    </Tooltip>
  ))
  .add("with left aligned tooltip text", () => (
    <Tooltip content={lorem} isOpen={true} textPosition={ECustomTooltipTextPosition.LEFT} />
  ));
