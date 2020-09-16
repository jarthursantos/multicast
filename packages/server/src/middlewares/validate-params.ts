import { Request, Response } from 'express'
import { ObjectSchema, ValidationError } from 'yup'

export function validateParams(schema: ObjectSchema) {
  return async (req: Request, res: Response, next: Function) => {
    try {
      await schema.validate(req.params, { abortEarly: false })
    } catch (err) {
      if (err instanceof ValidationError) {
        return res.status(400).json({ message: err.errors.join(', ') })
      }

      return res
        .status(400)
        .json({ message: err.message || 'Unexpected error' })
    }

    return next()
  }
}
