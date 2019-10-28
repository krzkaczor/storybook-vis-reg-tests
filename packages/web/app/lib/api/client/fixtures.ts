import * as Yup from "yup";

export const getSampleProducts = () => [
  {
    name: "productA",
    quantity: 5,
  },
  {
    name: "productB",
    quantity: 42,
  },
];

export const getSampleMalformedProducts = () => [
  {
    name: "productA",
  },
  {
    name: "productB",
  },
];

export interface IProduct {
  name: string;
  quantity: number;
}

export const productSchema = Yup.object().shape({
  name: Yup.string().required(),
  quantity: Yup.number().required(),
});
