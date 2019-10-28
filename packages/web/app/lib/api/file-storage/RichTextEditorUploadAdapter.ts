import { IUploadAdapter, IUploadAdapterFactory, TLoader } from "@ckeditor/ckeditor5-react";
import { inject, interfaces } from "inversify";

import { symbols } from "../../../di/symbols";
import { toReadableBytes } from "../../../utils/toReadableBytes";
import { ILogger } from "../../dependencies/logger/ILogger";
import { FileStorageApi, MAX_ALLOWED_FILE_SIZE } from "./FileStorageApi";

export class RichTextEditorUploadAdapter implements IUploadAdapter {
  constructor(
    @inject(symbols.fileStorageService) private fileStorageApi: FileStorageApi,
    @inject(symbols.logger) private logger: ILogger,
    private loader: TLoader,
  ) {}

  // Starts the upload process.
  async upload(): Promise<{ default: string }> {
    const file = await this.loader.file;

    if (file.size > MAX_ALLOWED_FILE_SIZE) {
      return Promise.reject(
        `Couldn't upload file. Max allowed file size is ${toReadableBytes(
          MAX_ALLOWED_FILE_SIZE,
        )} where file size is ${toReadableBytes(file.size)}`,
      );
    }

    try {
      const { url } = await this.fileStorageApi.uploadFile("image", file);

      return { default: url };
    } catch (e) {
      this.logger.error("Could not upload file for rich text editor", e);

      return Promise.reject(`Couldn't upload file: ${file.name}.`);
    }
  }

  abort(): void {}
}

export type TRichTextEditorUploadAdapterFactoryType = IUploadAdapterFactory;

export const richTextEditorUploadAdapterFactory: (
  context: interfaces.Context,
) => TRichTextEditorUploadAdapterFactoryType = context => {
  const fileStorageApi = context.container.get<FileStorageApi>(symbols.fileStorageService);
  const logger = context.container.get<ILogger>(symbols.logger);
  return (loader: TLoader) => new RichTextEditorUploadAdapter(fileStorageApi, logger, loader);
};
