import { Request, Response } from "express"

import Order from "@order/models/Order.model"
import { findCatalogProducts } from "@catalog/helpers/findCatalog"

export const AddOrderHandler = async (req: Request, res: Response) => {
  try {
    const { user } = res.locals
    const { products, catalog } = req.body

    if (user.type === "seller") {
      return res.status(400).json({
        data: [],
        message: "Sellers can't place orders",
      })
    }

    const existingCatalog = findCatalogProducts(catalog, products)

    if (!existingCatalog) {
      return res.status(400).json({
        data: [],
        message: "Catalog doesn't exist or doesn't contain products",
      })
    }

    const newOrder = await Order.create({ owner: user._id, products, catalog })

    user.orders.push(newOrder._id)
    await user.save()
    console.log("error here")

    return res.status(200).json({ data: newOrder, message: "Placed an order" })
  } catch (error) {
    console.log({ data: "", message: error })
    return res.status(500).json(error)
  }
}
