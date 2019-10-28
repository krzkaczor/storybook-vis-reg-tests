import { expect } from "chai";
import * as fetchMock from "fetch-mock";

import { createMock } from "../../../../test/testUtils";
import { ObjectStorage } from "../../persistence/ObjectStorage";
import { AuthorizedJsonHttpClient } from "./AuthJsonHttpClient";
import { JsonHttpClient } from "./JsonHttpClient";

const TOKEN = "1234ABCD";

describe("AuthorizedHttpClient", () => {
  it(`Should insert correct authorization header on requests`, async () => {
    const objectStorage: ObjectStorage<string> = createMock(ObjectStorage, {
      get: () => TOKEN,
    }) as any;

    const backendRootMock = { url: "" };

    const httpClient = new JsonHttpClient(backendRootMock);

    let receivedHeaders: any;

    const requestMatcher: fetchMock.MockMatcherFunction = (_url, opts) => {
      if (opts.method !== "GET") return false;
      receivedHeaders = opts.headers;
      return true;
    };

    fetchMock.once(requestMatcher, {});

    const authClient = new AuthorizedJsonHttpClient(objectStorage, httpClient);

    await authClient.get<{}>({
      baseUrl: "/",
      url: "some_url",
    });

    expect(receivedHeaders["Authorization"]).to.equal(`Bearer ${TOKEN}`);
  });
});
