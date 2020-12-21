import { Request, Response } from 'express'

import { FindBuyersUseCase } from './FindBuyersUseCase'

export class FindBuyersController {
  constructor(private findBuyersCase: FindBuyersUseCase) {}

  async handle(req: Request<{}, {}, {}, { query?: string }>, res: Response) {
    const { query } = req.query

    try {
      const buyers = await this.findBuyersCase.execute(query)

      return res.json(buyers)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
