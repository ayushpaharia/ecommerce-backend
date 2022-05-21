import { NextFunction, Request, Response } from "express"

import { jwt } from "@utils"
import User from "@user/models/User.model"

const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.token

    if (!token) throw new Error("Unauthenticated")

    const { valid, expired, decoded } = jwt.verify(token)

    const doesUserExist = await User.findById(decoded.id)
    if (!doesUserExist) throw new Error("Unauthenticated")
    res.locals.user = doesUserExist

    return next()
  } catch (err) {
    res.status(401).json({ data: "", message: "Unauthenticated" })
  }
}

export default isAuthenticated
