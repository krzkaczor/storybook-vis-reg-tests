import * as React from "react";
import { FormattedMessage } from "react-intl-phraseapp";
import { compose } from "recompose";

import { NOMINEE_BANK_ACCOUNT_WATCHER_DELAY } from "../../../config/constants";
import { actions } from "../../../modules/actions";
import { withActionWatcher } from "../../../utils/withActionWatcher.unsafe";
import { connectLinkBankAccountComponent } from "../../settings/linked-bank-account/ConnectLinkBankAccount";
import { Button, EButtonLayout, EButtonTheme, EIconPosition } from "../../shared/buttons/Button";

import * as link from "../../../assets/img/inline_icons/social_link.svg";

interface IProps {
  verifyBankAccount: () => void;
}

interface IExternalProps {
  verifyBankAccount: () => void;
  isBankAccountVerified: boolean;
  isUserFullyVerified: boolean;
}

const NomineeLinkBankAccountLayout: React.FunctionComponent<IProps> = ({ verifyBankAccount }) => (
  <>
    <h4>
      <FormattedMessage id="nominee-flow.link-bank-account.title" />
    </h4>
    <p>
      <FormattedMessage id="nominee-flow.link-bank-account.text" />
    </p>
    <Button
      layout={EButtonLayout.PRIMARY}
      theme={EButtonTheme.BRAND}
      onClick={verifyBankAccount}
      data-test-id="eto-nominee-accept"
      svgIcon={link}
      iconPosition={EIconPosition.ICON_BEFORE}
    >
      <FormattedMessage id="nominee-flow.link-bank-account.link-account-button-text" />
    </Button>
  </>
);

const NomineeLinkBankAccountBase = compose<IProps, IExternalProps>(
  withActionWatcher({
    actionCreator: dispatch => dispatch(actions.kyc.loadBankAccountDetails()),
    interval: NOMINEE_BANK_ACCOUNT_WATCHER_DELAY,
  }),
)(NomineeLinkBankAccountLayout);

const LinkBankAccount = connectLinkBankAccountComponent<{}>(NomineeLinkBankAccountBase);

export { LinkBankAccount, NomineeLinkBankAccountLayout };
