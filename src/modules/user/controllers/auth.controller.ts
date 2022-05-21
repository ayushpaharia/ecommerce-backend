import { Request, Response } from "express"
import Argon from "argon2"
import cookie from "cookie"

import User, { UserDocument } from "@user/models/User.model"
import { findUser } from "@user/helper/findUser"
import { jwt } from "@utils"

import _ from "lodash"

export const registerUserHandler = async (req: Request, res: Response) => {
  const { email, password, type } = req.body as UserDocument
  try {
    // Check if user exists
    const doesUserExist = await findUser(email)

    // If user exists return error
    if (doesUserExist !== null)
      return res.status(400).json({ data: "", message: "User already exists" })

    // Create the user
    const newUser = new User({ email, password, type })
    await newUser.save()

    // Return the user
    return res
      .status(200)
      .json({ data: newUser, message: "User succesfully created" })
  } catch (error) {
    console.log({ data: "", message: error })
    return res.status(500).json(error)
  }
}

export const loginUserHandler = async (req: Request, res: Response) => {
  const { email, password, type } = req.body as UserDocument
  try {
    // Find if User exists
    const doesUserExist = (await findUser(email)) as UserDocument

    if (!doesUserExist)
      return res
        .status(404)
        .json({ data: "", error: "User not found with given details" })

    // Compare Password
    const passwordMatch = await Argon.verify(doesUserExist.password, password)
    if (!passwordMatch)
      return res.status(401).json({ data: "", error: "Unauthorized" })

    const token = jwt.sign(
      { id: doesUserExist["_id"] },
      {
        expiresIn: process.env.ACCESS_TOKEN_TTL as string,
      },
    )

    // Set token in a cookies
    res.set(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        secure: (process.env.NODE_ENV as string) === "production",
        sameSite: "strict",
        maxAge: 3600 * 24,
        path: "/",
      }),
    )

    return res.status(200).json({
      data: token,
      message: "User successfully logged in",
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ data: "", message: error })
  }
}

export const logoutHandler = async (_: any, res: Response) => {
  try {
    res.set(
      "Set-Cookie",
      cookie.serialize("token", "", {
        httpOnly: true,
        secure: (process.env.NODE_ENV as string) === "production",
        sameSite: "strict",
        expires: new Date(),
        path: "/",
      }),
    )

    return res.status(200).json({ data: "", message: "logged out" })
  } catch (error) {
    return res.status(500).json({ data: "", message: error })
  }
}
