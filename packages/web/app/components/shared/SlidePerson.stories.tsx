import { storiesOf } from "@storybook/react";
import * as React from "react";

import { SlidePerson } from "./SlidePerson";

const person = {
  srcSet: {
    "1x": "",
    "2x": "",
    "3x": "",
  },
  name: "person name",
  role: "person role",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non tenetur, impedit labore vero eum omnis iusto quaerat ea, facere perferendis quae!",
  socialChannels: [{ type: "", url: "" }],
};

storiesOf("SlidePerson", module)
  .add("layout: vartical", () => <SlidePerson {...person} layout="vertical" />)
  .add("layout: horizontal", () => <SlidePerson {...person} layout="horizontal" />);
