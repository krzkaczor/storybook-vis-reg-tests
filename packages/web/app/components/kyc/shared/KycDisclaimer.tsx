import * as React from "react";
import { FormattedHTMLMessage, FormattedMessage } from "react-intl-phraseapp";

import { CommonHtmlProps } from "../../../types";

export const KycDisclaimer: React.FunctionComponent<CommonHtmlProps> = props => (
  <div {...props}>
    <h6>
      <FormattedMessage id="kyc.disclaimer.header" />
    </h6>
    <FormattedHTMLMessage tagName="span" id="kyc.disclaimer.contents" />
  </div>
);
