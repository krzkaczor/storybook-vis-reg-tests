import * as Yup from "yup";

export interface IVault {
  wallet: string;
}

export const VaultValidator = Yup.object()
  .shape({
    wallet: Yup.string(),
  })
  .required();
