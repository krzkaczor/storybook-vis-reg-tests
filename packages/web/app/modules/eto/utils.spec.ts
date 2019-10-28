import { expect } from "chai";

import { testEto } from "../../../test/fixtures";
import { EJurisdiction } from "../../lib/api/eto/EtoProductsApi.interfaces";
import { amendEtoToCompatibleFormat } from "./utils";

describe("eto-utils", () => {
  describe("amendEtoToCompatibleFormat", () => {
    it("should uppercase jurisdiction", () => {
      const amendedEto = amendEtoToCompatibleFormat(testEto);
      expect(testEto.product.jurisdiction).to.equal(EJurisdiction.GERMANY.toLowerCase());
      expect(amendedEto.product!.jurisdiction).to.equal(EJurisdiction.GERMANY);
    });
  });
});
