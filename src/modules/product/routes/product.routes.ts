import { Router } from "express"

import { isAuthenticated, validateRequest } from "@middlewares"

import { createProductSchema } from "@product/schema/product.schema"

import { AddProductHandler } from "@product/controllers/product.controller"

const userRoutes = Router()

/**
 * @route   POST /api/product
 * @desc    Create a new product for catalog
 */
userRoutes.post(
  "/",
  validateRequest(createProductSchema),
  isAuthenticated,
  AddProductHandler,
)

export default userRoutes
