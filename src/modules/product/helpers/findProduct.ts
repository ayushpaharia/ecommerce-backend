import Product, { ProductDocument } from "@product/models/Product.model"

export async function findProduct(
  catalog: string,
  name: string,
): Promise<ProductDocument | null> {
  try {
    return (await Product.findOne({ name, catalog })) as ProductDocument | null
  } catch (err) {
    throw new Error(err)
  }
}
export async function findAllProduct(
  name: string,
): Promise<ProductDocument[] | [] | null> {
  try {
    return (await Product.find({ name })) as ProductDocument[] | []
  } catch (err) {
    throw new Error(err)
  }
}
