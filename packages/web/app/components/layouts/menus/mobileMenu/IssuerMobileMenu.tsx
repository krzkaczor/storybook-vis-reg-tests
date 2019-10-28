import { compose, withProps } from "recompose";

import { issuerMenuData } from "../MenuData";
import { connectIssuerMenu, IIssuerMenuProps } from "../utils";
import { IMenuDataByUserType, IMobileMenuExternalProps } from "./MobileMenu";
import { MobileMenuInternal } from "./MobileMenuInternal";

export const IssuerMobileMenuBase = compose<
  IMenuDataByUserType & IMobileMenuExternalProps,
  IIssuerMenuProps & IMobileMenuExternalProps
>(
  withProps<IMenuDataByUserType, IIssuerMenuProps>(props => ({
    menuDataByUserType: issuerMenuData(props.userHasKycAndVerifiedEmail),
  })),
)(MobileMenuInternal);

export const IssuerMobileMenu = connectIssuerMenu<IMobileMenuExternalProps>(IssuerMobileMenuBase);
