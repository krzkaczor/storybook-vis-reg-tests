import { storiesOf } from "@storybook/react";
import * as React from "react";

import { SocialProfilesList } from "./SocialProfilesList";

const socialProfiles = [
  {
    type: "slack",
    url: "www.neufund.org",
  },
  {
    type: "twitter",
    url: "www.neufund.org",
  },
  {
    type: "medium",
    url: "www.neufund.org",
  },
  {
    type: "reddit",
    url: "www.neufund.org",
  },
  {
    type: "telegram",
    url: "www.neufund.org",
  },
  {
    type: "github",
    url: "www.neufund.org",
  },
  {
    type: "instagram",
    url: "www.neufund.org",
  },
  {
    type: "gplus",
    url: "www.neufund.org",
  },
  {
    type: "youtube",
    url: "www.neufund.org",
  },
  {
    type: "xing",
    url: "www.neufund.org ",
  },
];

storiesOf("SocialProfiles/SocialProfilesList", module).add("default", () => (
  <SocialProfilesList profiles={socialProfiles} />
));
