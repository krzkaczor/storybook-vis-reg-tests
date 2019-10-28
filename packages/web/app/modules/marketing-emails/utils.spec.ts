import { expect } from "chai";

import { isValidLink } from "./utils";

describe("isValidLink", () => {
  it("should return true", () => {
    expect(
      isValidLink(
        "https://platform.neufund.net/api/newsletter/subscriptions/0x6C1086C292a7E1FdF66C68776eA972038467A370/topics/news?signature=f3223867c87ad6ab464768e37ef489b8a8108785e79dbf314128fa528b01de1fdbd5ec9f6f565ff42fd2f65a3292936e&timestamp=1565777393047",
      ),
    ).to.be.true;
    expect(
      isValidLink(
        "https://localhost:666/subscriptions/0x6C1086C292a7E1FdF66C68776eA972038467A370/topics/news?signature=f3223867c87ad6ab464768e37ef489b8a8108785e79dbf314128fa528b01de1fdbd5ec9f6f565ff42fd2f65a3292936e&timestamp=1565777393047",
      ),
    ).to.be.true;
    expect(
      isValidLink(
        "https%3A%2F%2Fplatform.neufund.net%2Fapi%2Fnewsletter%2Fsubscriptions%2F0x6C1086C292a7E1FdF66C68776eA972038467A370%2Ftopics%2Fnews%3Fsignature%3Df3223867c87ad6ab464768e37ef489b8a8108785e79dbf314128fa528b01de1fdbd5ec9f6f565ff42fd2f65a3292936e%26timestamp%3D1565777393047",
      ),
    ).to.be.true;
  });

  it("should return false", () => {
    expect(isValidLink("https://google.com/api/newsletter/subscriptions/123/topics/2141")).to.be
      .false;
    expect(isValidLink("https://neufund.net/api/kyc/do_anything")).to.be.false;
    expect(isValidLink("https://neufund.io/api/newsletter/123/topics/2141")).to.be.false;
    expect(isValidLink("https://localhost:9090/api/subscriptions/123/topics/2141")).to.be.false;
  });
});
