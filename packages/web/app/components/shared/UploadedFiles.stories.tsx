import { storiesOf } from "@storybook/react";
import * as React from "react";

import { UploadedFiles } from "./UploadedFiles";

const files = [
  {
    id: "1234",
    fileName: "12345",
  },
];

storiesOf("Upload/UploadedFiles", module).add("default", () => <UploadedFiles files={files} />);
