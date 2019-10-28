import { EAdditionalValidationDataNotifications } from "../../../../../modules/tx/validator/reducer";

export const hasNotification = (
  notification: EAdditionalValidationDataNotifications,
  notificationList: ReadonlyArray<EAdditionalValidationDataNotifications>,
): boolean => notificationList.includes(notification);
