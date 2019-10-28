import { compose, withProps } from "recompose";

import { nomineeMenuData } from "../MenuData";
import { connectNomineeMenu, INomineeMenuProps } from "../utils";
import { IMenuDataByUserType, IMobileMenuExternalProps } from "./MobileMenu";
import { MobileMenuInternal } from "./MobileMenuInternal";

export const NomineeMobileMenuBase = compose<
  IMenuDataByUserType & IMobileMenuExternalProps,
  INomineeMenuProps & IMobileMenuExternalProps
>(
  withProps<IMenuDataByUserType, INomineeMenuProps>(props => ({
    menuDataByUserType: nomineeMenuData(props.nomineeEto),
  })),
)(MobileMenuInternal);

export const NomineeMobileMenu = connectNomineeMenu<IMobileMenuExternalProps>(
  NomineeMobileMenuBase,
);
