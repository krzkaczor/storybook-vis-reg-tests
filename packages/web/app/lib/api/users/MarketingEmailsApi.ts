import { inject, injectable } from "inversify";

import { symbols } from "../../../di/symbols";
import { IHttpClient } from "../client/IHttpClient";

@injectable()
export class MarketingEmailsApi {
  constructor(@inject(symbols.binaryHttpClient) private httpClient: IHttpClient) {}

  public async unsubscribeMarketingEmails(link: string): Promise<void> {
    await this.httpClient.get<void>({
      url: link,
    });
  }
}
