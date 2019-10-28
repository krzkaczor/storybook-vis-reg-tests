import { createMock } from "../../../test/testUtils";
import { Storage } from "./Storage";

// dummy storage storing everything in local object
export const createMockStorage = (): Storage => {
  const items: any = {};

  return createMock(Storage, {
    getKey: (key: string) => items[key],
    setKey: (key: string, val: string) => (items[key] = val),
  });
};
