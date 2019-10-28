import * as React from "react";

import { nomineeMenuData } from "../MenuData";
import { MenuEntry } from "../MenuEntry";
import { connectNomineeMenu, INomineeMenuProps } from "../utils";

import * as styles from "./Menu.module.scss";

const NomineeMenuLayout: React.FunctionComponent<INomineeMenuProps> = ({ nomineeEto }) => {
  const data = nomineeMenuData(nomineeEto);
  return (
    <div className={styles.menu}>
      {data.map(entry => (
        <MenuEntry {...entry} />
      ))}
    </div>
  );
};

export const NomineeMenu = connectNomineeMenu<{}>(NomineeMenuLayout);
