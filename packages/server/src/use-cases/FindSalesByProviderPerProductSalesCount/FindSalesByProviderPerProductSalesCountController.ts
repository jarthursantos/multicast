import { Response } from 'express'
import {
  FindSalesByProviderRequest,
  parseSalesByProviderOptions
} from 'utils/parse-sales-by-provider-options'

import { FindSalesByProviderPerProductSalesCountUseCase } from './FindSalesByProviderPerProductSalesCountUseCase'

export class FindSalesByProviderPerProductSalesCountController {
  constructor(
    private findSalesByProviderPerProductSalesCountUseCase: FindSalesByProviderPerProductSalesCountUseCase
  ) {}

  async handle(req: FindSalesByProviderRequest, res: Response) {
    const { query } = req

    try {
      const ProductSalesCounts = await this.findSalesByProviderPerProductSalesCountUseCase.execute(
        parseSalesByProviderOptions(query)
      )

      return res.json(ProductSalesCounts)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
