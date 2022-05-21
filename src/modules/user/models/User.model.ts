import mongoose from "mongoose"
import Argon from "argon2"

import { CatalogDocument } from "@catalog/models/Catalog.model"
import { OrderDocument } from "@order/models/Order.model"

export interface UserDocument extends mongoose.Document {
  email: string
  password: string
  type: "buyer" | "seller"
  catalog: CatalogDocument["_id"][]
  orders: OrderDocument["_id"][]
}

enum UserType {
  buyer = "buyer",
  seller = "seller",
}

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    type: {
      type: String,
      enum: UserType,
      default: UserType.buyer,
      required: true,
    },
    catalog: { type: mongoose.Schema.Types.ObjectId, ref: "Catalog" },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  },
  { timestamps: true },
)

UserSchema.pre("save", async function (next) {
  let user = this as UserDocument // selects incoming save data

  // hash pass if modified or new
  if (!user.isModified("password")) return next()

  // additional data
  const hash = await Argon.hash(user.password) // return hashed password

  // Replace password with hash
  user.password = hash
  return next()
})

const User = mongoose.model<UserDocument>("User", UserSchema)

export default User
