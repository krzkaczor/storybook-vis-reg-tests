import * as React from "react";
import { FormattedMessage } from "react-intl-phraseapp";

import { Tooltip } from "../../shared/tooltips/Tooltip";

type TTooltipProps = React.ComponentProps<typeof Tooltip>;

const ToBeAnnounced: React.FunctionComponent = () => (
  <FormattedMessage id="eto.public-view.tba-tooltip" />
);

const ToBeAnnouncedTooltip: React.FunctionComponent<Partial<TTooltipProps>> = props => (
  <Tooltip content={<FormattedMessage id="eto.public-view.tba-tooltip.content" />} {...props}>
    <ToBeAnnounced />
  </Tooltip>
);

export { ToBeAnnouncedTooltip, ToBeAnnounced };
