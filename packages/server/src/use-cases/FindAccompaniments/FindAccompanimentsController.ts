import { Request, Response } from 'express'

import { FindAccompanimentsUseCase } from './FindAccompanimentsUseCase'

export class FindAccompanimentsController {
  constructor(private findAccompanimentsCase: FindAccompanimentsUseCase) {}

  async handle(_: Request, res: Response) {
    try {
      const purchases = await this.findAccompanimentsCase.execute()

      return res.json(purchases)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
