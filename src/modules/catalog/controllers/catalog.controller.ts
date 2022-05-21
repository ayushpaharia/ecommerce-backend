import { Request, Response } from "express"

import Catalog from "@catalog/models/Catalog.model"
import { findAllCatalogues, findCatalog } from "@catalog/helpers/findCatalog"
import { findUser, findUserByID } from "@user/helper/findUser"

export const AddCataloguesHandler = async (req: Request, res: Response) => {
  try {
    const { user } = res.locals

    const existingCatalog = await findCatalog(user.id)
    if (existingCatalog) {
      return res.status(400).json({
        data: existingCatalog,
        message: "You already have a catalog",
      })
    }

    if (user.type === "buyer") {
      return res.status(400).json({
        data: [],
        message: "Buyer can't create a catalog",
      })
    }

    const newCatalog = await Catalog.create({ owner: user._id })

    user.catalog = newCatalog._id
    await user.save()

    return res
      .status(200)
      .json({ data: newCatalog, message: "Added a catalog for user" })
  } catch (error) {
    console.log({ data: "", message: error })
    return res.status(500).json(error)
  }
}

export const GetAllCataloguesHandler = async (req: Request, res: Response) => {
  try {
    const catalogues = await findAllCatalogues()
    return res
      .status(200)
      .json({ data: catalogues, message: "Retrieved all catalogues" })
  } catch (error) {
    console.log({ data: "", message: error })
    return res.status(500).json(error)
  }
}

export const GetAllUserCatalogHandler = async (req: Request, res: Response) => {
  const { userid } = req.params
  try {
    const catalogues = await (await findUserByID(userid)).populate("catalog")
    return res
      .status(200)
      .json({ data: catalogues, message: "Retrieved all catalogues" })
  } catch (error) {
    console.log({ data: "", message: error })
    return res.status(500).json(error)
  }
}
