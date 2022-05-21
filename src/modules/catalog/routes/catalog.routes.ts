import { Router } from "express"

import { isAuthenticated } from "@middlewares"

import {
  AddCataloguesHandler,
  GetAllCataloguesHandler,
  GetAllUserCatalogHandler,
} from "@catalog/controllers/catalog.controller"

const userRoutes = Router()

/**
 * @route   POST /api/catalog
 * @desc    Create a new catalog for user
 */
userRoutes.post("/", isAuthenticated, AddCataloguesHandler)

/**
 * @route   GET /api/catalog/
 * @desc    GET User Catalog
 */
userRoutes.get("/:userid", isAuthenticated, GetAllUserCatalogHandler)

/**
 * @route   GET /api/catalog/:userid
 * @desc    GET all catalogues
 */
userRoutes.get("/", isAuthenticated, GetAllCataloguesHandler)

export default userRoutes
