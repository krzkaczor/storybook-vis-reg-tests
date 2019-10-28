import { inject, injectable } from "inversify";

import { symbols } from "../../../di/symbols";
import { IHttpClient } from "../client/IHttpClient";
import { TAnalyticsTransactionsResponse } from "./interfaces";

const ANALYTICS_API_ROOT = "/api/analytics-api";

@injectable()
export class AnalyticsApi {
  constructor(@inject(symbols.authorizedJsonHttpClient) private httpClient: IHttpClient) {}

  getTransactionsList(
    limit: number,
    lastTransactionId?: string,
  ): Promise<TAnalyticsTransactionsResponse> {
    return this.httpClient
      .get<TAnalyticsTransactionsResponse>({
        baseUrl: ANALYTICS_API_ROOT,
        url: `/transactions/me`,
        queryParams: {
          limit,
          before_transaction: lastTransactionId,
        },
      })
      .then(r => r.body);
  }

  getUpdatedTransactions(timestampOfLastChange: number): Promise<TAnalyticsTransactionsResponse> {
    return this.httpClient
      .get<TAnalyticsTransactionsResponse>({
        baseUrl: ANALYTICS_API_ROOT,
        url: `/transactions/new/me`,
        queryParams: {
          after_version: timestampOfLastChange,
        },
      })
      .then(r => r.body);
  }
}
