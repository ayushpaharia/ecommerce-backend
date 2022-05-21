import { Response, Router } from "express"

import authRoutes from "@user/routes/auth.routes"
import userRoutes from "@user/routes/user.routes"
import catalogRoutes from "@catalog/routes/catalog.routes"
import productRoutes from "@product/routes/product.routes"
import orderRoutes from "@order/routes/order.routes"

const registerRoutes = (app: Router) => {
  // Default route
  app.get("/", (_, res: Response) => {
    return res.status(200).json({ message: "OK" })
  })

  // Users Routes
  app.use("/api/auth", authRoutes)
  app.use("/api/user", userRoutes)

  // Catalog Routes
  app.use("/api/catalog", catalogRoutes)

  // Product Routes
  app.use("/api/product", productRoutes)

  // Order Routes
  app.use("/api/order", orderRoutes)
}
export default registerRoutes
