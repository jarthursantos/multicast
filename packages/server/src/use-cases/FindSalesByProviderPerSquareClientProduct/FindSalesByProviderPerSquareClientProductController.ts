import { Response } from 'express'
import {
  FindSalesByProviderRequest,
  parseSalesByProviderOptions
} from 'utils/parse-sales-by-provider-options'

import { FindSalesByProviderPerSquareClientProductUseCase } from './FindSalesByProviderPerSquareClientProductUseCase'

export class FindSalesByProviderPerSquareClientProductController {
  constructor(
    private findSalesByProviderPerSquareClientProductUseCase: FindSalesByProviderPerSquareClientProductUseCase
  ) {}

  async handle(req: FindSalesByProviderRequest, res: Response) {
    const { query } = req

    try {
      const squareClientProducts = await this.findSalesByProviderPerSquareClientProductUseCase.execute(
        parseSalesByProviderOptions(query)
      )

      return res.json(squareClientProducts)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
