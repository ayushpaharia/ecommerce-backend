import { NextFunction, Request, Response } from "express"
import { AnySchema } from "yup"

const validate =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      })

      return next()
    } catch (error) {
      return res.status(400).json({ data: "", message: error })
    }
  }
export default validate
