import { Request, Response } from 'express'

import { CreateAnnotationsUseCase } from './CreateAnnotationsUseCase'

export class CreateAnnotationsController {
  constructor(private createAnnotationsCase: CreateAnnotationsUseCase) {}

  async handle(req: Request, res: Response) {
    const { body, params, auth } = req
    const { id } = params

    try {
      const annotation = await this.createAnnotationsCase.execute(
        id,
        body,
        auth.user.id
      )

      return res.json(annotation)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
