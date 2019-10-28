import { expect } from "chai";

import { IPFS_PROTOCOL } from "../../config/constants";
import { hashFromIpfsLink, ipfsLinkFromHash } from "./utils";

describe("ipfs link functions", () => {
  const hash = "QmS3qGWqvruywjM7Lp82LiyoyqDQbArdXveC5JA5m54Qfv";
  const link = `${IPFS_PROTOCOL}:${hash}`;

  describe("hashFromIpfsLink", () => {
    it("throws if parameter is not a string", () => {
      expect(() => hashFromIpfsLink([] as any)).to.throw();
    });
    it("throws if link doesn't include 'ipfs:'", () => {
      expect(() => hashFromIpfsLink("bla")).to.throw();
    });
    it("extracts hash from link", () => {
      expect(hashFromIpfsLink(link)).to.eq(hash);
    });
  });

  describe("ipfsLinkFromHash", () => {
    it("throws if parameter is not a string", () => {
      expect(() => ipfsLinkFromHash(null as any)).to.throw();
    });
    it("throws if empty string", () => {
      expect(() => ipfsLinkFromHash("")).to.throw();
    });
    it("creates an ipfs link", () => {
      expect(ipfsLinkFromHash("QmS3qGWqvruywjM7Lp82LiyoyqDQbArdXveC5JA5m54Qfv")).to.eq(link);
    });
  });
});
