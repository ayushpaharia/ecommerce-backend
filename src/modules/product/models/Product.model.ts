import mongoose from "mongoose"

export interface ProductDocument extends mongoose.Document {
  catalog: ProductDocument["_id"]
  quantity: number
  name: string
  price: string
}

const ProductSchema = new mongoose.Schema(
  {
    catalog: { type: mongoose.Schema.Types.ObjectId, ref: "Catalog" },
    quantity: { type: Number, default: 1 },
    name: { type: String, required: true },
    price: { type: String, required: true },
  },
  { timestamps: true },
)

const Product = mongoose.model<ProductDocument>("Product", ProductSchema)

export default Product
