import { injectable } from "inversify";

import { showErrorToast, showInfoToast } from "../../components/shared/Toast";
import { getMessageTranslation } from "../../components/translatedMessages/messages";
import { TMessage } from "../../components/translatedMessages/utils";

@injectable()
export class NotificationCenter {
  public error(message: TMessage, options?: Parameters<typeof showErrorToast>[1]): void {
    showErrorToast(getMessageTranslation(message), options);
  }
  public info(message: TMessage, options?: Parameters<typeof showInfoToast>[1]): void {
    showInfoToast(getMessageTranslation(message), options);
  }
}
