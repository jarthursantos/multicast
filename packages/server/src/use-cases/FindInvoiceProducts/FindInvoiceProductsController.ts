import { Request, Response } from 'express'

import { FindInvoiceProductsUseCase } from './FindInvoiceProductsUseCase'

export class FindInvoiceProductsController {
  constructor(private findInvoiceProductsCase: FindInvoiceProductsUseCase) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params

    try {
      const products = await this.findInvoiceProductsCase.execute(id)

      return res.json(products)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
