import { inject, injectable } from "inversify";

import { symbols } from "../../../di/symbols";
import { ILogger } from "../../dependencies/logger";
import { IHttpClient } from "../client/IHttpClient";
import { IVault, VaultValidator } from "./interfaces";

const VAULT_API_ROOT = "/api/wallet";

@injectable()
export class VaultApi {
  constructor(
    @inject(symbols.jsonHttpClient) private httpClient: IHttpClient,
    @inject(symbols.logger) private logger: ILogger,
  ) {}

  public async store(key: string, serializedVault: string): Promise<void> {
    this.logger.info("Storing vault with Key: ", key);

    await this.httpClient.post<string>({
      baseUrl: VAULT_API_ROOT,
      url: `/vault/${key}`,
      responseSchema: VaultValidator,
      body: { wallet: serializedVault },
    });
  }

  public async retrieve(key: string): Promise<string> {
    this.logger.info("Retrieving vault with Key: ", key);

    const response = await this.httpClient.get<IVault>({
      baseUrl: VAULT_API_ROOT,
      url: `/vault/${key}`,
      responseSchema: VaultValidator,
    });

    return response.body.wallet;
  }
}
