import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import * as React from "react";

import { VerificationStatus } from "./VerificationStatus";

const dataDefault = [
  {
    label: "representation",
    isChecked: false,
    onClick: action("representation-click"),
  },
  {
    label: "personal details",
    isChecked: false,
    onClick: action("personal-details-click"),
  },
  {
    label: "documents verification",
    isChecked: false,
    onClick: action("documents-verification-click"),
  },
  {
    label: "review",
    isChecked: false,
    onClick: action("review-click"),
  },
];

const dataOneChecked = [
  {
    label: "representation",
    isChecked: true,
    onClick: action("representation-click"),
  },
  {
    label: "personal details",
    isChecked: false,
    onClick: action("personal-details-click"),
  },
  {
    label: "documents verification",
    isChecked: false,
    onClick: action("documents-verification-click"),
  },
  {
    label: "review",
    isChecked: false,
    onClick: action("review-click"),
  },
];

const dataAllChecked = [
  {
    label: "representation",
    isChecked: true,
    onClick: action("representation-click"),
  },
  {
    label: "personal details",
    isChecked: true,
    onClick: action("personal-details-click"),
  },
  {
    label: "documents verification",
    isChecked: true,
    onClick: action("documents-verification-click"),
  },
  {
    label: "review",
    isChecked: true,
    onClick: action("review-click"),
  },
];

storiesOf("KYC/VerificationStatus", module)
  .add("default", () => <VerificationStatus steps={dataDefault} />)
  .add("one checked", () => <VerificationStatus steps={dataOneChecked} />)
  .add("all checked", () => <VerificationStatus steps={dataAllChecked} />);
