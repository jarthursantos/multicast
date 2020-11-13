import { Request, Response } from 'express'

import { FindBuyerByCodeUseCase } from './FindBuyerByCodeUseCase'

export class FindBuyerByCodeController {
  constructor(private findBuyerByCodeCase: FindBuyerByCodeUseCase) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params

    try {
      const buyer = await this.findBuyerByCodeCase.handle(parseInt(id))

      return res.json(buyer)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
