import * as React from "react";

import { WarningAlert } from "../../../shared/WarningAlert";

type TPayoutWidgetError = {
  error: string;
};

export const PayoutWidgetError: React.FunctionComponent<TPayoutWidgetError> = ({ error }) => (
  <WarningAlert data-test-id="my-portfolio-widget-error">{error}</WarningAlert>
);
