import { storiesOf } from "@storybook/react";
import * as React from "react";

import { ETagSize, Tag } from "./Tag";

storiesOf("Basic UI/Tag", module)
  .add("default", () => <Tag text={"lorem"} />)
  .add("themed link", () => (
    <>
      <Tag text={"dark theme"} to="#0" theme="dark" />
      <Tag text={"green theme"} to="#0" theme="green" />
      <Tag text={"silver theme"} to="#0" theme="silver" />
      <Tag to="#0" text="tag" />
      <Tag layout="ghost" to="#0" text="ghost tag" />
      <Tag layout="ghost" size={ETagSize.SMALL} to="#0" text="small ghost tag" />
      <Tag
        theme="green"
        layout="ghost"
        size={ETagSize.SMALL}
        to="#0"
        text="Small green ghost tag"
      />
      <Tag theme="dark" size={ETagSize.SMALL} to="#0" text="Small dark tag" />
    </>
  ))
  .add("themed a/span", () => (
    <>
      <Tag text={"dark theme"} onClick={() => {}} theme="dark" />
      <Tag text={"green theme"} onClick={() => {}} theme="green" />
      <Tag text={"silver theme"} onClick={() => {}} theme="silver" />
      <Tag onClick={() => {}} text="tag" />
      <Tag layout="ghost" onClick={() => {}} text="ghost tag" />
      <Tag layout="ghost" size={ETagSize.SMALL} onClick={() => {}} text="small ghost tag" />
      <Tag
        theme="green"
        layout="ghost"
        size={ETagSize.SMALL}
        onClick={() => {}}
        text="Small green ghost tag"
      />
      <Tag theme="dark" size={ETagSize.SMALL} onClick={() => {}} text="Small dark tag" />
    </>
  ))
  .add("themed div", () => (
    <>
      <Tag text={"dark theme"} theme="dark" />
      <Tag text={"green theme"} theme="green" />
      <Tag text={"silver theme"} theme="silver" />
      <Tag to="#0" text="tag" />
      <Tag layout="ghost" text="ghost tag" />
      <Tag layout="ghost" size={ETagSize.SMALL} text="small ghost tag" />
      <Tag theme="green" layout="ghost" size={ETagSize.SMALL} text="Small green ghost tag" />
      <Tag theme="dark" size={ETagSize.SMALL} text="Small dark tag" />
    </>
  ));
