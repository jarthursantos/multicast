import { Request, Response } from 'express'

import { UpdateAccompanimentsUseCase } from './UpdateAccompanimentsUseCase'

export class UpdateAccompanimentsController {
  constructor(private updateAccompanimentsCase: UpdateAccompanimentsUseCase) {}

  async handle(req: Request, res: Response) {
    const { body, params } = req
    const { id } = params

    try {
      const accompaniment = await this.updateAccompanimentsCase.execute(
        id,
        body
      )

      return res.json(accompaniment)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
