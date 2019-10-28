import * as YupTS from "../../yup-ts.unsafe";

export interface IImmutableFileId {
  ipfsHash: string;
  mimeType: string;
  placeholders?: { [key: string]: string };
  asPdf: boolean;
}

export const FileDescriptionType = YupTS.string();

export const ImmutableFileDescriptionValidator = FileDescriptionType.toYup();
