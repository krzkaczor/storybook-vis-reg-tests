import * as React from "react";
import { compose, withProps } from "recompose";

import { DropdownMenuEntry, TMenuEntry } from "../MenuEntry";
import { initMobileMenuData } from "../utils";
import { IMenuDataByUserType, IMobileMenuExternalProps } from "./MobileMenu";

import * as styles from "./MobileMenu.module.scss";

interface IMenuData {
  data: TMenuEntry[];
}

export const MobileMenuInternalLayout: React.FunctionComponent<IMenuData> = ({ data }) => (
  <div className={styles.menu}>
    <div className={styles.menuInner}>
      {data.map(entry => (
        <DropdownMenuEntry {...entry} />
      ))}
    </div>
  </div>
);

export const MobileMenuInternal = compose<
  IMenuData,
  IMobileMenuExternalProps & IMenuDataByUserType
>(
  withProps<IMenuData, IMobileMenuExternalProps & IMenuDataByUserType>(props => {
    const data = initMobileMenuData({
      actionRequired: props.actionRequired,
      logout: props.logout,
      menuDataByUserType: props.menuDataByUserType,
    });
    return { data };
  }),
)(MobileMenuInternalLayout);
