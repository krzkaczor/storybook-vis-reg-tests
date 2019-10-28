/**
 * @deprecated Use `createActionFactory` instead
 * @todo if `createActionFactory` is adopted, remove `createAction`
 */
export const createAction = <T extends string, P extends {}>(type: T, payload: P) => ({
  type,
  payload,
});

/**
 * @deprecated Use `createActionFactory` instead
 * @todo if `createActionFactory` is adopted, remove `createSimpleAction`
 */
export const createSimpleAction = <T extends string>(type: T) => ({ type });
