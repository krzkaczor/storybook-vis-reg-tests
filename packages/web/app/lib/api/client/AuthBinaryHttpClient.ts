/**
 * Wraps the binary http api with authorization header injection
 * collected from localstorage
 */
import { inject, injectable } from "inversify";

import { symbols } from "../../../di/symbols";
import { ObjectStorage } from "../../persistence/ObjectStorage";
import { AuthorizedHttpClient } from "./AuthHttpClient";
import { IHttpClient } from "./IHttpClient";

//@see https://github.com/inversify/InversifyJS/blob/master/wiki/inheritance.md#workaround-d-inject-into-the-derived-class
@injectable()
export class AuthorizedBinaryHttpClient extends AuthorizedHttpClient {
  constructor(
    @inject(symbols.jwtStorage) protected objectStorage: ObjectStorage<string>,
    @inject(symbols.binaryHttpClient) protected httpClient: IHttpClient,
  ) {
    super();
  }
}
