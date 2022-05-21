import mongoose from "mongoose"

import { UserDocument } from "@user/models/User.model"
import { ProductDocument } from "@product/models/Product.model"
import { CatalogDocument } from "@catalog/models/Catalog.model"

export interface OrderDocument extends mongoose.Document {
  order_by: UserDocument["_id"]
  catalog: CatalogDocument["_id"]
  products: ProductDocument["_id"][]
}

const OrderSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    catalog: { type: mongoose.Schema.Types.ObjectId, ref: "Catalog" },
  },
  { timestamps: true },
)

const Order = mongoose.model<OrderDocument>("Order", OrderSchema)

export default Order
