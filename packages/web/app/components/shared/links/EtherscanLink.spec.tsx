import { expect } from "chai";
import { shallow } from "enzyme";
import * as React from "react";

import { EtherscanAddressLink, EtherscanTxLink } from "./EtherscanLink";
import { ExternalLink } from "./ExternalLink";

describe("etherscan links", () => {
  describe("<EtherscanTxLink />", () => {
    const hash = "0x23e1cea790dda1e8dfa8c6e3fc2b9a1d3fb27049fbf1c0d5a8436b132050b4a0";

    it("should render etherscan address link with trimmed address as a content", () => {
      const component = shallow(
        <EtherscanTxLink txHash={hash} data-test-id="etherscan-external-link" />,
      );

      expect(
        component.equals(
          <ExternalLink
            href={`https://etherscan.io/tx/${hash}`}
            data-test-id="etherscan-external-link"
            data-test-hash={hash}
          >
            0x23e1cea7...b4a0
          </ExternalLink>,
        ),
      ).to.be.true;
    });

    it("should render etherscan address link with custom content", () => {
      const component = shallow(
        <EtherscanTxLink txHash={hash} data-test-id="etherscan-external-link">
          etherscan.io
        </EtherscanTxLink>,
      );

      expect(
        component.equals(
          <ExternalLink
            href={`https://etherscan.io/tx/${hash}`}
            data-test-id="etherscan-external-link"
            data-test-hash={hash}
          >
            etherscan.io
          </ExternalLink>,
        ),
      ).to.be.true;
    });
  });

  describe("<EtherscanAddressLink />", () => {
    const address = "0x6C1086C292a7E1FdF66C68776eA972038467A370";

    it("should render etherscan address link with trimmed address as a content", () => {
      const component = shallow(
        <EtherscanAddressLink address={address} data-test-id="etherscan-external-link" />,
      );

      expect(
        component.equals(
          <ExternalLink
            href={`https://etherscan.io/address/${address}`}
            data-test-id="etherscan-external-link"
          >
            0x6C1086C2...A370
          </ExternalLink>,
        ),
      ).to.be.true;
    });

    it("should render etherscan address link with custom content", () => {
      const component = shallow(
        <EtherscanAddressLink address={address} data-test-id="etherscan-external-link">
          etherscan.io
        </EtherscanAddressLink>,
      );

      expect(
        component.equals(
          <ExternalLink
            href={`https://etherscan.io/address/${address}`}
            data-test-id="etherscan-external-link"
          >
            etherscan.io
          </ExternalLink>,
        ),
      ).to.be.true;
    });
  });
});
