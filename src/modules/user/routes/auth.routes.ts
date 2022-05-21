import { Router } from "express"

import {
  registerUserHandler,
  loginUserHandler,
  logoutHandler,
} from "@user/controllers/auth.controller"

import { isAuthenticated, validateRequest } from "@middlewares"

import { registerUserSchema, loginUserSchema } from "@user/schema/auth.schema"

const authRoutes = Router()

/**
 * @route   POST /api/auth/register
 * @desc    Register a user
 */
authRoutes.post(
  "/register",
  validateRequest(registerUserSchema),
  registerUserHandler,
)

/**
 * @route   POST /api/auth/login
 * @desc    Login a user
 */
authRoutes.post("/login", validateRequest(loginUserSchema), loginUserHandler)

/**
 * @route   GET /api/auth/logout
 * @desc    Login a user
 */
authRoutes.delete("/logout", isAuthenticated, logoutHandler)

export default authRoutes
