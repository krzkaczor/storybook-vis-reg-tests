import { compose } from "recompose";

import { userHasKycAndEmailVerified } from "../../../modules/eto-flow/selectors";
import { TEtoWithCompanyAndContract } from "../../../modules/eto/types";
import { selectNomineeEtoWithCompanyAndContract } from "../../../modules/nominee-flow/selectors";
import { appConnect } from "../../../store";
import { accountMenuData, menuSeparatorData } from "./MenuData";
import { TMenuEntry } from "./MenuEntry";
import { IMenuDataByUserType, IMobileMenuExternalProps } from "./mobileMenu/MobileMenu";

interface IIssuerMenuProps {
  userHasKycAndVerifiedEmail: boolean;
}

interface INomineeMenuProps {
  nomineeEto: TEtoWithCompanyAndContract | undefined;
}

const initMobileMenuData = ({
  actionRequired,
  logout,
  menuDataByUserType,
}: IMobileMenuExternalProps & IMenuDataByUserType): TMenuEntry[] => {
  const accountMenu = accountMenuData(actionRequired, logout);
  const data = menuDataByUserType.concat(accountMenu);

  data.splice(-2, 0, menuSeparatorData("separator-1"));

  return data;
};

const connectIssuerMenu = <T extends {}>(
  WrappedComponent: React.ComponentType<IIssuerMenuProps & T>,
) =>
  compose<IIssuerMenuProps & T, T>(
    appConnect<IIssuerMenuProps, {}, T>({
      stateToProps: state => ({
        userHasKycAndVerifiedEmail: userHasKycAndEmailVerified(state),
      }),
    }),
  )(WrappedComponent);

const connectNomineeMenu = <T extends {}>(
  WrappedComponent: React.ComponentType<INomineeMenuProps & T>,
) =>
  compose<INomineeMenuProps & T, T>(
    appConnect<INomineeMenuProps, {}, T>({
      stateToProps: state => ({
        nomineeEto: selectNomineeEtoWithCompanyAndContract(state),
      }),
    }),
  )(WrappedComponent);

export {
  IIssuerMenuProps,
  INomineeMenuProps,
  initMobileMenuData,
  connectIssuerMenu,
  connectNomineeMenu,
};
