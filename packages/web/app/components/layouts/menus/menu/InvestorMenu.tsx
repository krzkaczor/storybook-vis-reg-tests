import * as React from "react";

import { investorMenuData } from "../MenuData";
import { MenuEntry } from "../MenuEntry";

import * as styles from "./Menu.module.scss";

export const InvestorMenu: React.FunctionComponent = () => {
  const data = investorMenuData();

  return (
    <div className={styles.menu}>
      {data.map(entry => (
        <MenuEntry {...entry} />
      ))}
    </div>
  );
};
