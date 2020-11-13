import { Response } from 'express'
import {
  FindSalesByProviderRequest,
  parseSalesByProviderOptions
} from 'utils/parse-sales-by-provider-options'

import { FindSalesByProviderPerProductSalesValueUseCase } from './FindSalesByProviderPerProductSalesValueUseCase'

export class FindSalesByProviderPerProductSalesValueController {
  constructor(
    private findSalesByProviderPerProductSalesValueUseCase: FindSalesByProviderPerProductSalesValueUseCase
  ) {}

  async handle(req: FindSalesByProviderRequest, res: Response) {
    const { query } = req

    try {
      const productSalesValues = await this.findSalesByProviderPerProductSalesValueUseCase.execute(
        parseSalesByProviderOptions(query)
      )

      return res.json(productSalesValues)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
