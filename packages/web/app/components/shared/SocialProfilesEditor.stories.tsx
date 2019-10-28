import { storiesOf } from "@storybook/react";
import * as React from "react";

import { formWrapper } from "./forms/fields/testingUtils.unsafe";
import { SocialProfilesEditor } from "./SocialProfilesEditor";

import * as githubIcon from "../../assets/img/inline_icons/social_github.svg";
import * as googlePlusIcon from "../../assets/img/inline_icons/social_google_plus.svg";
import * as instagramIcon from "../../assets/img/inline_icons/social_instagram.svg";
import * as mediumIcon from "../../assets/img/inline_icons/social_medium.svg";
import * as redditIcon from "../../assets/img/inline_icons/social_reddit.svg";
import * as slackIcon from "../../assets/img/inline_icons/social_slack.svg";
import * as telegramIcon from "../../assets/img/inline_icons/social_telegram.svg";
import * as twitterIcon from "../../assets/img/inline_icons/social_twitter.svg";
import * as xingIcon from "../../assets/img/inline_icons/social_xing.svg";
import * as youtubeIcon from "../../assets/img/inline_icons/social_youtube.svg";

const socialProfiles = [
  {
    name: "slack",
    placeholder: "slack",
    svgIcon: slackIcon,
  },
  {
    name: "twitter",
    placeholder: "twitter",
    svgIcon: twitterIcon,
  },
  {
    name: "gplus",
    placeholder: "google plus",
    svgIcon: googlePlusIcon,
  },
  {
    name: "Slack",
    svgIcon: slackIcon,
  },
  {
    name: "Medium",
    svgIcon: mediumIcon,
  },
  {
    name: "Reddit",
    url: "reddit.com",
    svgIcon: redditIcon,
    preSelected: true,
  },
  {
    name: "Telegram",
    svgIcon: telegramIcon,
  },
  {
    name: "Github",
    svgIcon: githubIcon,
    preSelected: true,
  },
  {
    name: "Instagram",
    svgIcon: instagramIcon,
  },
  {
    name: "Google+",
    svgIcon: googlePlusIcon,
  },
  {
    name: "YouTube",
    svgIcon: youtubeIcon,
  },
  {
    name: "Xing",
    svgIcon: xingIcon,
  },
];

storiesOf("SocialProfiles/SocialProfilesEditor", module).add(
  "default",
  formWrapper({ name: [{ type: "twitter", url: "fufu" }] })(() => (
    <SocialProfilesEditor profiles={socialProfiles} name="name" />
  )),
);
