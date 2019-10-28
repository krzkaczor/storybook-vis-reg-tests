import { storiesOf } from "@storybook/react";
import * as React from "react";

import {
  Button,
  ButtonArrowLeft,
  ButtonArrowRight,
  ButtonSize,
  ButtonWidth,
  EButtonLayout,
  EButtonTheme,
  EIconPosition,
} from "./Button";

import * as icon from "../../../assets/img/inline_icons/icon_questionmark.svg";

storiesOf("buttons/default", module)
  .add("primary", () => (
    <>
      <Button>primary</Button>
      <br />
      <br />
      <Button disabled>primary disabled</Button>
      <br />
      <br />
      <Button isLoading>loading</Button>
    </>
  ))
  .add("secondary", () => (
    <>
      <Button layout={EButtonLayout.SECONDARY}>secondary</Button>
      <br />
      <Button layout={EButtonLayout.SECONDARY} disabled>
        secondary disabled
      </Button>
    </>
  ))
  .add("inline", () => (
    <>
      <Button layout={EButtonLayout.INLINE}>Call to Action</Button>
    </>
  ))
  .add("simple", () => (
    <>
      <Button layout={EButtonLayout.SIMPLE}>Call to Action</Button>
    </>
  ))
  .add("with icons", () => (
    <>
      <Button
        layout={EButtonLayout.SECONDARY}
        svgIcon={icon}
        iconPosition={EIconPosition.ICON_BEFORE}
      >
        icon before text
      </Button>
      <br />
      <Button
        layout={EButtonLayout.SECONDARY}
        svgIcon={icon}
        iconPosition={EIconPosition.ICON_AFTER}
      >
        icon after text
      </Button>
    </>
  ))
  .add("with theme", () => (
    <>
      <Button theme={EButtonTheme.WHITE}>white primary</Button>
      <br />
      <Button theme={EButtonTheme.WHITE} disabled>
        white primary disabled
      </Button>
      <br />
      <Button svgIcon={icon} theme={EButtonTheme.WHITE} iconPosition={EIconPosition.ICON_BEFORE}>
        white primary icon before text
      </Button>
      <br />
      <Button layout={EButtonLayout.SECONDARY} theme={EButtonTheme.WHITE}>
        white secondary
      </Button>
      <br />
      <Button layout={EButtonLayout.SECONDARY} theme={EButtonTheme.WHITE} disabled>
        white secondary disabled
      </Button>
      <br />
      <Button
        layout={EButtonLayout.SECONDARY}
        svgIcon={icon}
        theme={EButtonTheme.WHITE}
        iconPosition={EIconPosition.ICON_BEFORE}
      >
        secondary white icon before text
      </Button>
      <br />
      <Button
        layout={EButtonLayout.SECONDARY}
        svgIcon={icon}
        theme={EButtonTheme.WHITE}
        iconPosition={EIconPosition.ICON_BEFORE}
        disabled
      >
        secondary white icon before text disabled
      </Button>
      <br />
      <Button theme={EButtonTheme.NEON}>neon primary</Button>
      <br />
      <Button theme={EButtonTheme.NEON} disabled>
        neon primary disabled
      </Button>
      <br />
      <Button theme={EButtonTheme.GREEN} layout={EButtonLayout.SECONDARY}>
        green secondary
      </Button>
      <br />
      <Button theme={EButtonTheme.GREEN} layout={EButtonLayout.SECONDARY} disabled>
        green secondary disabled
      </Button>
      <br />
      <br />
      <Button theme={EButtonTheme.BLUE} layout={EButtonLayout.SECONDARY}>
        blue secondary
      </Button>
      <br />
      <Button theme={EButtonTheme.BLUE} layout={EButtonLayout.SECONDARY} disabled>
        blue secondary disabled
      </Button>
      <br />
    </>
  ))
  .add("with size", () => (
    <>
      {/* Default button */}
      <Button size={ButtonSize.NORMAL}>normal button</Button>
      <br />
      <Button size={ButtonSize.SMALL}>small button</Button>
      <br />
      <Button size={ButtonSize.HUGE}>huge button</Button>
      <br />
      <br />
      {/* Secondary button */}
      <Button layout={EButtonLayout.SECONDARY} size={ButtonSize.NORMAL}>
        secondary button
      </Button>
      <br />
      <Button layout={EButtonLayout.SECONDARY} size={ButtonSize.SMALL}>
        secondary small button
      </Button>
      <br />
      <Button layout={EButtonLayout.SECONDARY} size={ButtonSize.HUGE}>
        secondary huge button
      </Button>
    </>
  ))
  .add("with width", () => (
    <>
      <Button width={ButtonWidth.NORMAL}>normal button</Button>
      <br />
      <br />
      <Button width={ButtonWidth.BLOCK}>block button</Button>
      <br />
      <br />
      <Button width={ButtonWidth.WIDE}>wide button</Button>
      <br />
      <br />
      <Button width={ButtonWidth.NO_PADDING}>no padding</Button>
    </>
  ));

storiesOf("buttons/ArrowRight", module).add("primary", () => (
  <ButtonArrowRight>primary</ButtonArrowRight>
));

storiesOf("buttons/ArrowLeft", module).add("primary", () => (
  <ButtonArrowLeft>primary</ButtonArrowLeft>
));
