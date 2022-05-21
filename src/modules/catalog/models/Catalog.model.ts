import mongoose from "mongoose"

import { ProductDocument } from "@product/models/Product.model"
import { UserDocument } from "@user/models/User.model"

export interface CatalogDocument extends mongoose.Document {
  owner: UserDocument["_id"]
  products: ProductDocument["_id"][]
}

const CatalogSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true },
)

const Catalog = mongoose.model<CatalogDocument>("Catalog", CatalogSchema)

export default Catalog
