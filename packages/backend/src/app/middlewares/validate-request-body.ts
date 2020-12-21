import { Request, Response } from 'express'
import createHttpError from 'http-errors'
import { ObjectSchema, ValidationError } from 'yup'

export function validateRequestBody(schema: ObjectSchema) {
  return async (req: Request, res: Response, next: Function) => {
    try {
      await schema.validate(req.body, { abortEarly: false })
    } catch (err) {
      if (err instanceof ValidationError) {
        err.message = err.errors.join(', ')
      }

      throw new createHttpError.BadRequest(err.message || 'Erro inesperado')
    }

    return next()
  }
}
