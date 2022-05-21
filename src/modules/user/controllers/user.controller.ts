import { Request, Response } from "express"

import User, { UserDocument } from "@user/models/User.model"

export const getUsersByTypeHandler = async (req: Request, res: Response) => {
  let { type } = req.query
  try {
    const users: UserDocument[] = await User.find({ type })
    return res.status(200).json({ data: users, message: `${type}s` })
  } catch (error) {
    console.log({ data: "", message: error })
    return res.status(500).json(error)
  }
}
