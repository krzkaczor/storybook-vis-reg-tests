import { storiesOf } from "@storybook/react";
import * as React from "react";

import { SanitizedHtml } from "./SanitizedHtml";

const html = `
      <h2>Heading 2</h2>
      <h3>Heading 3</h3>
      <h4>Heading 4</h4>
      
      <p>Paragraph</p>
      
      <a href="https://platform.neufund.org">Neufund Platform</a>
      
      <strong>bold text</strong>
      
      <i>italic text</i>
      
      <ul>
        <li>unordered list 1</li>
        <li>unordered list 2</li>
      </ul> 
      
      <ol>
        <li>ordered list 1</li>
        <li>ordered list 2</li>
      </ol>
    `;

storiesOf("SanitizedHtml", module).add("should render allowed rich text", () => (
  <SanitizedHtml unsafeHtml={html} />
));
