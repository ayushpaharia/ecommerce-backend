import { Router } from "express"

import { isAuthenticated } from "@middlewares"

import { getUsersByTypeHandler } from "@user/controllers/user.controller"

const userRoutes = Router()

/**
 * @route   GET /api/user
 * @query   type: seller | buyer
 * @desc    Get all users by type
 */
userRoutes.get("/", isAuthenticated, getUsersByTypeHandler)

export default userRoutes
