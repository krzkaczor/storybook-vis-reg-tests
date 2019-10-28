import * as cn from "classnames";
import * as React from "react";

import { InlineIcon } from "./icons";
import { ExternalLink } from "./links";

import * as bitcointalk from "../../assets/img/inline_icons/icon-menu-help.svg";
import * as facebook from "../../assets/img/inline_icons/social_facebook.svg";
import * as github from "../../assets/img/inline_icons/social_github.svg";
import * as gplus from "../../assets/img/inline_icons/social_google_plus.svg";
import * as instagram from "../../assets/img/inline_icons/social_instagram.svg";
import * as linkedin from "../../assets/img/inline_icons/social_linkedin.svg";
import * as medium from "../../assets/img/inline_icons/social_medium.svg";
import * as reddit from "../../assets/img/inline_icons/social_reddit.svg";
import * as slack from "../../assets/img/inline_icons/social_slack.svg";
import * as telegram from "../../assets/img/inline_icons/social_telegram.svg";
import * as twitter from "../../assets/img/inline_icons/social_twitter.svg";
import * as xing from "../../assets/img/inline_icons/social_xing.svg";
import * as youtube from "../../assets/img/inline_icons/social_youtube.svg";
import * as styles from "./SocialProfilesList.module.scss";

export type TSocialChannelType =
  | "facebook"
  | "github"
  | "gplus"
  | "instagram"
  | "linkedin"
  | "medium"
  | "reddit"
  | "slack"
  | "telegram"
  | "twitter"
  | "xing"
  | "bitcointalk"
  | "youtube";

export interface IEtoSocialProfile {
  type: string;
  url: string;
}

type TLayoutSize = "small";
type TLayoutPosition = "center";

interface IProps {
  profiles: ReadonlyArray<IEtoSocialProfile>;
  layoutIconSize?: TLayoutSize;
  layoutIconsPosition?: TLayoutPosition;
  showLabels?: boolean;
  isClickable?: boolean;
}

export const SOCIAL_PROFILE_ICONS: {
  [key: string]: string;
} = {
  facebook,
  github,
  gplus,
  instagram,
  linkedin,
  medium,
  reddit,
  slack,
  telegram,
  twitter,
  xing,
  youtube,
  bitcointalk,
};

const SocialProfilesList: React.FunctionComponent<IProps> = ({
  profiles,
  layoutIconSize,
  layoutIconsPosition,
  showLabels = true,
  isClickable = true,
}) => {
  const icon = (url: string, type: string): React.ReactNode => {
    if (isClickable) {
      return (
        <ExternalLink href={url} title={url} className={styles.icon}>
          <InlineIcon svgIcon={SOCIAL_PROFILE_ICONS[type]} />
        </ExternalLink>
      );
    } else {
      return (
        <div className={styles.icon}>
          <InlineIcon svgIcon={SOCIAL_PROFILE_ICONS[type]} />
        </div>
      );
    }
  };

  return (
    <div className={cn(styles.socialProfilesList, layoutIconSize, layoutIconsPosition)}>
      {profiles &&
        profiles.map(
          ({ type, url }) =>
            !!url.length && (
              <div className={styles.profile} key={`${type}-${url}`}>
                {icon(url, type)}
                {showLabels && (
                  <div className={styles.label}>
                    <div className={styles.content}>{type}</div>
                    <div className={styles.ornament} />
                  </div>
                )}
              </div>
            ),
        )}
    </div>
  );
};

export { SocialProfilesList };
