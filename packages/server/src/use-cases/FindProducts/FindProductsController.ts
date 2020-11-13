import { Request, Response } from 'express'

import { FindProductsUseCase } from './FindProductsUseCase'

export class FindProductsController {
  constructor(private findProductsUseCase: FindProductsUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const products = await this.findProductsUseCase.execute()

      return res.json(products)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
