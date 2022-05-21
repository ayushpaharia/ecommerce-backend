import { Request, Response } from "express"

import Product from "@product/models/Product.model"
import { findProduct } from "@product/helpers/findProduct"
import { findCatalog, findCatalogByID } from "@catalog/helpers/findCatalog"

export const AddProductHandler = async (req: Request, res: Response) => {
  const { name, price, quantity, catalog } = req.body
  const { user } = res.locals
  try {
    const existingCatalog = await findCatalogByID(catalog)
    if (!existingCatalog.owner.equals(user._id)) {
      return res
        .status(401)
        .json({ data: [], message: "Catalog belongs to another user" })
    }

    console.log(existingCatalog)

    if (!existingCatalog)
      return res.status(404).json({ data: [], message: "Catalog not found!" })

    const existingProduct = await findProduct(catalog, name)

    if (!existingProduct) {
      const newProduct = await Product.create({
        name,
        price,
        quantity: quantity || 1,
        catalog,
      })

      existingCatalog.products.push(newProduct._id)
      await existingCatalog.save()

      return res
        .status(200)
        .json({ data: newProduct, message: "Added Product to catalog" })
    }

    existingProduct.quantity += quantity
    await existingProduct.save()

    return res.status(200).json({
      data: existingProduct,
      message: "Added another Product to catalog",
    })
  } catch (error) {
    console.log({ data: "", message: error })
    return res.status(500).json(error)
  }
}
