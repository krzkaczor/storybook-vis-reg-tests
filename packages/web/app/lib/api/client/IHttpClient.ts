import * as Yup from "yup";

import { Dictionary, Primitive } from "../../../types";
import { Schema } from "../../yup-ts.unsafe";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface IHttpRequestCommon {
  url: string;
  baseUrl?: string;
  responseSchema?: Yup.Schema<any> | Schema<any>;
  headers?: Dictionary<string>;
  body?: any;
  formData?: FormData;
  skipResponseParsing?: boolean;
  expectsNoResponse?: boolean;
  allowedStatusCodes?: number[]; // 20x are always allowed
  disableManglingRequestBody?: boolean; // by default we make body of the request snake cased since our backend expects this form
}

export interface IHttpClientErrorDocument {
  status: number; // http status goes here
  title: string; // human readable string goes here
  type: string; // type of the error
  instance: string; // url that was hit goes here
  // @todo add space for failed validation here
}

export interface IHttpGetRequest extends IHttpRequestCommon {
  queryParams?: Dictionary<Primitive>;
}
export interface IHttpPostRequest extends IHttpRequestCommon {
  queryParams?: Dictionary<Primitive>;
}
export interface IHttpPutRequest extends IHttpRequestCommon {}
export interface IHttpPatchRequest extends IHttpRequestCommon {}
export interface IHttpDeleteRequest extends IHttpRequestCommon {}

export interface IHttpResponse<T> {
  body: T;
  statusCode: number;
}

export interface IHttpClient {
  get<T>(config: IHttpGetRequest): Promise<IHttpResponse<T>>;
  post<T>(config: IHttpPostRequest): Promise<IHttpResponse<T>>;
  put<T>(config: IHttpPutRequest): Promise<IHttpResponse<T>>;
  patch<T>(config: IHttpPatchRequest): Promise<IHttpResponse<T>>;
  delete<T>(config: IHttpDeleteRequest): Promise<IHttpResponse<T>>;
}
