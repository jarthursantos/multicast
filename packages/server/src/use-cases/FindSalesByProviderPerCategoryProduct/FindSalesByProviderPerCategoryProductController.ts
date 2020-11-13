import { Response } from 'express'
import {
  FindSalesByProviderRequest,
  parseSalesByProviderOptions
} from 'utils/parse-sales-by-provider-options'

import { FindSalesByProviderPerCategoryProductUseCase } from './FindSalesByProviderPerCategoryProductUseCase'

export class FindSalesByProviderPerCategoryProductController {
  constructor(
    private findSalesByProviderPerCategoryProductUseCase: FindSalesByProviderPerCategoryProductUseCase
  ) {}

  async handle(req: FindSalesByProviderRequest, res: Response) {
    const { query } = req

    try {
      const categoryProducts = await this.findSalesByProviderPerCategoryProductUseCase.execute(
        parseSalesByProviderOptions(query)
      )

      return res.json(categoryProducts)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
