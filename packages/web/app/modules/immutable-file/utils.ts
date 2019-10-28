import { saveAs } from "file-saver";

import { getMessageTranslation } from "../../components/translatedMessages/messages";
import { TMessage } from "../../components/translatedMessages/utils";

export function downloadLink(blob: Blob, name: TMessage | string, fileExtension: string): void {
  const resolvedName = typeof name === "string" ? name : getMessageTranslation(name);

  // Cypress is not able to download files
  if (process.env.NF_CYPRESS_RUN === "1") {
    return alert(
      `This is a cypress mock for file download. Filename: ${resolvedName}${fileExtension}`,
    );
  }

  saveAs(blob, `${resolvedName}${fileExtension}`);
}
