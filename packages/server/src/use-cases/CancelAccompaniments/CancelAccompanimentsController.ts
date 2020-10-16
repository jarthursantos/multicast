import { Request, Response } from 'express'

import { CancelAccompanimentsUseCase } from './CancelAccompanimentsUseCase'

export class CancelAccompanimentsController {
  constructor(private cancelAccompanimentsCase: CancelAccompanimentsUseCase) {}

  async handle(req: Request, res: Response) {
    const { body, params, auth } = req
    const { id } = params

    try {
      await this.cancelAccompanimentsCase.execute(id, body, auth.user)

      return res.send()
    } catch (error) {
      return res.status(200).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
