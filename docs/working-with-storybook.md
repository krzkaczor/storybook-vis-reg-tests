# Working with Storybook

## Setup

Use `yarn storybook` to launch Storybook server. Open `http://localhost:9001`.

All files with global setting, plugins and addons are placed in `.storybook` folder.

To create story you need to create file using following pattern `ComponentName.stories.tsx`, it'll
be imported automatically to Storybook.

Example story:

```javascript
  import { storiesOf } from "@storybook/react";
  import * as React from "react";

  import { ComponentName } from "./ComponentName";

  storiesOf("ComponentName", module)
    .add("default", () => (
      <ComponentName />
    ))
    .add("with data", () => (
      <ComponentName data={...} />
    ))
    .add("loading", () => (
      <ComponentName loading={true} />
    ));
```

For more information please see official documentation https://storybook.js.org/basics/introduction/
