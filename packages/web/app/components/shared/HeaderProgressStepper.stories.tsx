import { storiesOf } from "@storybook/react";
import * as React from "react";
import { FormattedMessage } from "react-intl-phraseapp";

import { HeaderProgressStepper } from "./HeaderProgressStepper";

const propsDefault = {
  steps: 3,
  currentStep: 2,
  headerText: <FormattedMessage id="settings.backup-seed-flow-container.safety-message" />,
  warning: false,
};

const propsWarning = {
  steps: 3,
  currentStep: 2,
  headerText: <FormattedMessage id="settings.backup-seed-flow-container.safety-message" />,
  descText: <FormattedMessage id="settings.backup-seed-flow-container.follow-instructions" />,
  warning: true,
};

const propsWithDescription = {
  steps: 3,
  currentStep: 2,
  headerText: <FormattedMessage id="settings.backup-seed-flow-container.safety-message" />,
  descText: <FormattedMessage id="settings.backup-seed-flow-container.follow-instructions" />,
  warning: false,
};

storiesOf("Recovery/HeaderProgressStepper", module)
  .add("default", () => <HeaderProgressStepper {...propsDefault} />)
  .add("warning", () => <HeaderProgressStepper {...propsWarning} />)
  .add("with description", () => <HeaderProgressStepper {...propsWithDescription} />);
