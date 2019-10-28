import { emailActions } from "./email/actions";
import { jwtActions } from "./jwt/actions";
import { authUserActions } from "./user/actions";

export const authActions = {
  ...emailActions,
  ...jwtActions,
  ...authUserActions,
};
