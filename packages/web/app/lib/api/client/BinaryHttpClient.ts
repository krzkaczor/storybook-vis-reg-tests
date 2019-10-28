/**
 * Wraps fetch with Binary based, injectable wrapper.
 *
 */

import { injectable } from "inversify";

import { Dictionary } from "../../../types";
import { HttpClient, ResponseParsingError } from "./HttpClient";
import { HttpMethod, IHttpRequestCommon, IHttpResponse } from "./IHttpClient";

@injectable()
export class BinaryHttpClient extends HttpClient {
  protected readonly requestHeaders: Dictionary<string> = {
    Accept: "application/pdf, application/msword, application/octet-stream",
    "Content-Type": "application/json",
  };

  protected readonly formDataRequestHeaders: Dictionary<string> = {
    Accept: "application/json, text/plain",
  };

  protected async makeFetchRequest<T>(
    fullUrl: string,
    method: HttpMethod,
    config: IHttpRequestCommon,
  ): Promise<IHttpResponse<T>> {
    let response;

    response = await this.makeRequest(fullUrl, method, config);
    let binaryResponse;
    if (!config.expectsNoResponse) {
      binaryResponse = await response.blob().catch(() => {
        throw new ResponseParsingError("Response is not a blob");
      });
    }
    return {
      statusCode: response.status,
      body: binaryResponse as any,
    };
  }
}
