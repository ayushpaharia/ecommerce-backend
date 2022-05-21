import { object, string, number } from "yup"

export const createProductSchema = object({
  body: object({
    catalog: string().required("Catalog is required"),
    name: string().required("Name is required"),
    price: number().required("Number is required"),
    quantity: number().default(1),
  }),
})
