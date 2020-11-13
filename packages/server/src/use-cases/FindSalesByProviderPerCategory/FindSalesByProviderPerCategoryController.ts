import { Response } from 'express'
import {
  FindSalesByProviderRequest,
  parseSalesByProviderOptions
} from 'utils/parse-sales-by-provider-options'

import { FindSalesByProviderPerCategoryUseCase } from './FindSalesByProviderPerCategoryUseCase'

export class FindSalesByProviderPerCategoryController {
  constructor(
    private findSalesByProviderPerCategoryUseCase: FindSalesByProviderPerCategoryUseCase
  ) {}

  async handle(req: FindSalesByProviderRequest, res: Response) {
    const { query } = req

    try {
      const categories = await this.findSalesByProviderPerCategoryUseCase.execute(
        parseSalesByProviderOptions(query)
      )

      return res.json(categories)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
