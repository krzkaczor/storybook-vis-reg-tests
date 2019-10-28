import * as React from "react";

import { WarningAlert } from "../../../shared/WarningAlert";

type TMyNeuWidgetError = {
  error: string | undefined;
};

export const MyNeuWidgetError: React.FunctionComponent<TMyNeuWidgetError> = ({ error }) => (
  <WarningAlert data-test-id="my-neu-widget-error">{error}</WarningAlert>
);
