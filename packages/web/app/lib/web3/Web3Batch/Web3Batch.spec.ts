import { expect } from "chai";
import { random } from "lodash/fp";
import { SinonFakeTimers, spy, useFakeTimers } from "sinon";
import * as Web3 from "web3";

import { createMock } from "../../../../test/testUtils";
import { noopLogger } from "../../dependencies/logger";
import { Web3AutoExecuteBatch } from "./Web3Batch";

const createJsonRPCRequest = (method: string, params: any[] = []) => ({
  params,
  method,
  id: random(1, 1000),
  jsonrpc: "2",
});

describe("Web3Batch", () => {
  describe("Web3AutoExecuteBatch", () => {
    let clock: SinonFakeTimers;

    beforeEach(() => {
      clock = useFakeTimers();
    });

    afterEach(() => {
      clock.restore();
    });

    it("should not create web3 batch each `add` call", async () => {
      const addSpy = spy();
      const web3Batch = {
        add: addSpy,
        requests: {
          length: addSpy.callCount,
        },
      };

      const web3 = createMock(Web3 as any, {
        createBatch: () => web3Batch,
      });

      const web3AutoExecuteBatch = new Web3AutoExecuteBatch(web3 as any, noopLogger);

      const request1 = createJsonRPCRequest("eth_call");
      const request2 = createJsonRPCRequest("eth_call");

      web3AutoExecuteBatch.add(request1);
      web3AutoExecuteBatch.add(request2);

      expect(web3.createBatch).to.be.calledOnce;
      expect(web3Batch.add).to.be.calledTwice;
      expect(web3Batch.add.getCall(0)).to.be.calledWith(request1);
      expect(web3Batch.add.getCall(1)).to.be.calledWith(request2);
    });

    it("should execute batch in the next event loop", async () => {
      const addSpy = spy();
      const web3Batch = {
        add: addSpy,
        execute: spy(),
        requests: {
          length: addSpy.callCount,
        },
      };

      const web3 = createMock(Web3 as any, {
        createBatch: () => web3Batch,
      });

      const web3AutoExecuteBatch = new Web3AutoExecuteBatch(web3 as any, noopLogger);

      const request = createJsonRPCRequest("eth_call");

      web3AutoExecuteBatch.add(request);

      clock.tick(0);

      expect(web3Batch.execute).to.be.calledOnce;
    });

    it("should recreate batch after executing requests", async () => {
      const addSpy = spy();
      const web3Batch = {
        add: addSpy,
        execute: spy(),
        requests: {
          length: addSpy.callCount,
        },
      };

      const web3 = createMock(Web3 as any, {
        createBatch: () => web3Batch,
      });

      const web3AutoExecuteBatch = new Web3AutoExecuteBatch(web3 as any, noopLogger);

      // first batch request
      const request1 = createJsonRPCRequest("eth_call");
      web3AutoExecuteBatch.add(request1);
      clock.tick(0);

      // second batch request
      const request2 = createJsonRPCRequest("eth_call");
      web3AutoExecuteBatch.add(request2);
      clock.tick(0);

      expect(web3.createBatch).to.be.calledTwice;
    });
  });
});
