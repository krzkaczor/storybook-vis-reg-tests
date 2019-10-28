import * as React from "react";
import { FormattedHTMLMessage, FormattedMessage } from "react-intl-phraseapp";

import { Heading } from "../shared/Heading";

const ICBMWalletHelpTextModal: React.FunctionComponent = () => (
  <section data-test-id="wallet-selector-icbm-wallet-help-text-modal">
    <Heading level={3} className="mb-4">
      <FormattedMessage id="icbm-help-modal.title" />
    </Heading>

    <p className="mb-0">
      <FormattedHTMLMessage tagName="span" id="icbm-help-modal.paragraph" />
    </p>
  </section>
);

export { ICBMWalletHelpTextModal };
