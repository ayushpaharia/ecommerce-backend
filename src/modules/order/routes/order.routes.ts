import { Router } from "express"

import { isAuthenticated } from "@middlewares"

import { AddOrderHandler } from "@order/controllers/order.controller"

const orderRoutes = Router()

/**
 * @route   POST /api/order/
 * @desc    Create an order
 */
orderRoutes.post("/", isAuthenticated, AddOrderHandler)

export default orderRoutes
