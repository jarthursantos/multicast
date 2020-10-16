import { Request, Response } from 'express'

import { FindAccompanimentProductsUseCase } from './FindAccompanimentProductsUseCase'

export class FindAccompanimentProductsController {
  constructor(
    private findAccompanimentProductsCase: FindAccompanimentProductsUseCase
  ) {}

  async handle(
    req: Request<
      { id: string },
      {},
      {},
      { only: 'invoice' | 'pending' | 'delivered' }
    >,
    res: Response
  ) {
    const { id } = req.params
    const { only } = req.query

    try {
      const products = await this.findAccompanimentProductsCase.execute(
        id,
        only
      )

      return res.json(products)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
