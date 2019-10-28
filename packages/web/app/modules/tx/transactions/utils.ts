const numberOnlyRegEx = new RegExp("^[0-9]+$");

export const doesStringOnlyContainIntegers = (value: string) =>
  typeof value === "string" && numberOnlyRegEx.test(value);
