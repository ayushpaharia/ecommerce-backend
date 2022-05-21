import dotenv from "dotenv"
import express from "express"

dotenv.config()

import { connectToDB, registerMiddlewares, registerRoutes } from "./utils"

console.clear()

const PORT = process.env.PORT || 5000
const HOST = process.env.HOST || "localhost"
async function bootstrap() {
  const app = express()

  registerMiddlewares(app)
  registerRoutes(app)

  app.listen(PORT, () => {
    connectToDB()
    console.log(`🚀 Server listening on ${HOST}:${PORT}`)
  })

  // Graceful shutdown
  process
    .on("SIGINT", () => {
      console.log("\nGracefully shutting down from SIGINT (Ctrl-C) 💀")
      process.exit()
    })
    .on("SIGTERM", () => {
      console.log("\nGracefully shutting down from SIGTERM (kill) 💀")
      process.exit()
    })
}

bootstrap()
