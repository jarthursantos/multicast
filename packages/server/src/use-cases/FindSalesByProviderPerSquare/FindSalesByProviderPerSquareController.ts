import { Response } from 'express'
import {
  FindSalesByProviderRequest,
  parseSalesByProviderOptions
} from 'utils/parse-sales-by-provider-options'

import { FindSalesByProviderPerSquareUseCase } from './FindSalesByProviderPerSquareUseCase'

export class FindSalesByProviderPerSquareController {
  constructor(
    private findSalesByProviderPerSquareUseCase: FindSalesByProviderPerSquareUseCase
  ) {}

  async handle(req: FindSalesByProviderRequest, res: Response) {
    const { query } = req

    try {
      const squares = await this.findSalesByProviderPerSquareUseCase.execute(
        parseSalesByProviderOptions(query)
      )

      return res.json(squares)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
