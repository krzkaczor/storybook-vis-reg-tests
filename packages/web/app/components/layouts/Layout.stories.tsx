import { storiesOf } from "@storybook/react";
import * as React from "react";

import { dummyEthereumAddressWithChecksum } from "../../../test/fixtures";
import { EUserType } from "../../lib/api/users/interfaces";
import { IAppState } from "../../store";
import { DeepPartial } from "../../types";
import { withStore } from "../../utils/storeDecorator.unsafe";
import { EContentWidth } from "./Content";
import { LayoutComponent, TransitionalLayout } from "./Layout";

const FakeContent = () => (
  <div style={{ height: "20rem", backgroundColor: "gray" }}>dummy content</div>
);

const authStore: DeepPartial<IAppState> = {
  auth: {
    jwt: "asdf",
    user: {
      type: EUserType.ISSUER,
      verifiedEmail: "asfasdf@asdf.de",
    },
  },
  kyc: {
    claims: {
      isVerified: true,
    },
  },
  web3: {
    connected: true,
    wallet: {
      address: dummyEthereumAddressWithChecksum,
    },
  },
};

const unauthStore: DeepPartial<IAppState> = {
  auth: {
    user: {
      type: EUserType.ISSUER,
      verifiedEmail: "asfasdf@asdf.de",
    },
  },
  kyc: {
    claims: {
      isVerified: true,
    },
  },
  web3: {
    connected: true,
    wallet: {
      address: dummyEthereumAddressWithChecksum,
    },
  },
};

storiesOf("Layouts", module)
  .addDecorator(withStore(authStore))
  .add("LayoutAuthorized", () => (
    <LayoutComponent userIsAuthorized={true}>
      <FakeContent />
    </LayoutComponent>
  ))
  .add("LayoutAuthorized with full width content", () => (
    <LayoutComponent userIsAuthorized={true} width={EContentWidth.FULL}>
      <FakeContent />
    </LayoutComponent>
  ))
  .addDecorator(withStore(unauthStore))
  .add("LayoutUnauthorized", () => (
    <LayoutComponent userIsAuthorized={false}>
      <FakeContent />
    </LayoutComponent>
  ))
  .add("TransitionalLayout", () => (
    <TransitionalLayout>
      <FakeContent />
    </TransitionalLayout>
  ));
