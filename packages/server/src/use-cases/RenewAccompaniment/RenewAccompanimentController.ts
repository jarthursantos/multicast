import { Request, Response } from 'express'

import { RenewAccompanimentUseCase } from './RenewAccompanimentUseCase'

export class RenewAccompanimentController {
  constructor(private renewAccompanimentCase: RenewAccompanimentUseCase) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params

    try {
      const renewed = await this.renewAccompanimentCase.execute(id)

      return res.json(renewed)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
