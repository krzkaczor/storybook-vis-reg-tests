import * as React from "react";
import { FormattedHTMLMessage } from "react-intl-phraseapp";
import { branch, compose, renderNothing, setDisplayName } from "recompose";

import { externalRoutes } from "../../../../../config/externalRoutes";
import { selectUserId } from "../../../../../modules/auth/selectors";
import { EEtoFormTypes } from "../../../../../modules/eto-flow/types";
import { appConnect } from "../../../../../store";
import { AccountAddress } from "../../../../shared/AccountAddress";
import { FormHighlightGroup } from "../../../../shared/forms/FormHighlightGroup";
import { Section } from "../../Shared";

interface IStateProps {
  issuerId: string | undefined;
}

interface IProps {
  issuerId: string;
}

const NoPendingNomineesComponent: React.FunctionComponent<IProps> = ({ issuerId }) => (
  <Section data-test-id="no-pending-nominee-requests">
    <FormattedHTMLMessage
      tagName="p"
      id="eto.form.eto-nominee.select-nominee-text"
      values={{ href: externalRoutes.neufundSupportHome }}
    />

    <FormHighlightGroup>
      <AccountAddress address={issuerId} data-test-id="issuer-id" />
    </FormHighlightGroup>
  </Section>
);

const CopyEtoIdComponent = compose<IProps, {}>(
  setDisplayName(EEtoFormTypes.EtoVotingRights),
  appConnect<IStateProps>({
    stateToProps: s => ({
      issuerId: selectUserId(s),
    }),
  }),
  branch<IStateProps>(({ issuerId }) => issuerId === undefined, renderNothing),
)(NoPendingNomineesComponent);

export { CopyEtoIdComponent, NoPendingNomineesComponent };
