import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import * as React from "react";

import { testEto } from "../../../../../test/fixtures";
import { IEtoDocument } from "../../../../lib/api/eto/EtoFileApi.interfaces";
import { TagsWidgetLayout } from "./TagsWidget";

const defaultProps = {
  downloadDocument: action("downloadDocument"),
  eto: testEto,
  termSheet: {} as IEtoDocument,
  prospectusApproved: {} as IEtoDocument,
  smartContractOnChain: true,
};

storiesOf("ETO/TagsWidget", module)
  .add("not embedded", () => <TagsWidgetLayout isEmbedded={false} {...defaultProps} />)
  .add("embedded", () => <TagsWidgetLayout isEmbedded={true} {...defaultProps} />);
