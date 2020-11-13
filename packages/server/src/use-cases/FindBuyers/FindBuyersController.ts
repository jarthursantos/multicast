import { Request, Response } from 'express'

import { FindBuyersUseCase } from './FindBuyersUseCase'

export class FindBuyersController {
  constructor(private findBuyersCase: FindBuyersUseCase) {}

  async handle(_req: Request, res: Response) {
    try {
      const buyers = await this.findBuyersCase.execute()

      return res.json(buyers)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
