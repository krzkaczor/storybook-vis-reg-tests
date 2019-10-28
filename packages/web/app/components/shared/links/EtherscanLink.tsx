import * as React from "react";

import { CommonHtmlProps } from "../../../types";
import { etherscanAddressLink, etherscanTxLink } from "../../appRouteUtils";
import { ExternalLink } from "./ExternalLink";

interface IEtherscanTxLink {
  txHash: string;
}

const trimEthereumHash = (hash: string) => `${hash.slice(0, 10)}...${hash.slice(-4)}`;

const EtherscanTxLink: React.FunctionComponent<IEtherscanTxLink & CommonHtmlProps> = ({
  txHash,
  children,
  ...props
}) => (
  <ExternalLink
    href={etherscanTxLink(txHash)}
    data-test-id={`etherscan-link.${txHash}`}
    data-test-hash={txHash}
    {...props}
  >
    {children || trimEthereumHash(txHash)}
  </ExternalLink>
);

interface IEtherscanAddressLink {
  address: string;
}

const EtherscanAddressLink: React.FunctionComponent<IEtherscanAddressLink & CommonHtmlProps> = ({
  address,
  children,
  ...props
}) => (
  <ExternalLink
    href={etherscanAddressLink(address)}
    data-test-id={`etherscan-address.${address}`}
    {...props}
  >
    {children || trimEthereumHash(address)}
  </ExternalLink>
);

export { EtherscanTxLink, EtherscanAddressLink };
