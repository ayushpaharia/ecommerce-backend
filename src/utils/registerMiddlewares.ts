import cors from "cors"
import cookieParser from "cookie-parser"
import cookieSession from "cookie-session"
import mongoSanitize from "express-mongo-sanitize"
import xss from "xss-clean"
import helmet from "helmet"
import morgan from "morgan"
import express from "express"

import { trim } from "@middlewares"

const registerMiddlewares = (app: express.Application) => {
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(cookieParser())
  app.use(cors({ credentials: true }))
  app.use(helmet()) // security headers
  app.use(mongoSanitize()) // sanitization against NoSQL Injection Attacks
  app.use(xss()) // sanitize data
  app.use(morgan("dev"))
  app.use(trim)
  const sessionMiddleware = cookieSession({
    secure: process.env.NODE_ENV === "production",
    name: "session",
    keys: [process.env.SESSION_SECRECT],
    maxAge: 24 * 60 * 60 * 1000, // session will expire after 24 hours
  })
  app.use(sessionMiddleware)
}

export default registerMiddlewares
