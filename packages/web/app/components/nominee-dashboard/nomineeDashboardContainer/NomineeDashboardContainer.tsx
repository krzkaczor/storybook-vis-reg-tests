import * as React from "react";
import { compose } from "recompose";

import { selectIsBankAccountVerified } from "../../../modules/bank-transfer-flow/selectors";
import { TEtoWithCompanyAndContract } from "../../../modules/eto/types";
import { selectNomineeEtoWithCompanyAndContract } from "../../../modules/nominee-flow/selectors";
import { selectIsVerificationFullyDone } from "../../../modules/selectors";
import { appConnect } from "../../../store";
import { AccountSetupContainer } from "./AccountSetupContainer";
import { LinkedNomineeDashboardContainer } from "./LinkedNomineeDashboardContainer";
import { NotLinkedNomineeDashboardContainer } from "./NotLinkedNomineeDashboardContainer";

interface IStateProps {
  verificationIsComplete: boolean;
  isBankAccountVerified: boolean;
  nomineeEto: TEtoWithCompanyAndContract | undefined;
}

const NomineeDashboardContainerBase: React.FunctionComponent<IStateProps> = ({
  verificationIsComplete,
  nomineeEto,
  isBankAccountVerified,
  children,
}) => {
  if (!verificationIsComplete) {
    return <AccountSetupContainer children={children} />;
  } else if (nomineeEto === undefined) {
    return <NotLinkedNomineeDashboardContainer children={children} />;
  } else if (!isBankAccountVerified) {
    return <LinkedNomineeDashboardContainer children={children} />;
  } else {
    return <LinkedNomineeDashboardContainer children={children} />;
  }
};

const NomineeDashboardContainer = compose<IStateProps, {}>(
  appConnect<IStateProps>({
    stateToProps: state => ({
      nomineeEto: selectNomineeEtoWithCompanyAndContract(state),
      isBankAccountVerified: selectIsBankAccountVerified(state),
      verificationIsComplete: selectIsVerificationFullyDone(state),
    }),
  }),
)(NomineeDashboardContainerBase);

export { NomineeDashboardContainer };
