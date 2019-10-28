import * as YupTS from "../../yup-ts.unsafe";

export const FileDescriptionType = YupTS.object({
  type: YupTS.string(),
  url: YupTS.string(),
});

export const FileDescriptionValidator = FileDescriptionType.toYup();

export type TFileDescription = YupTS.TypeOf<typeof FileDescriptionType>;

export type TFileType = "image";
