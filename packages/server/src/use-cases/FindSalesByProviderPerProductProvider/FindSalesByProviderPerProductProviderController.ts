import { Response } from 'express'
import {
  FindSalesByProviderRequest,
  parseSalesByProviderOptions
} from 'utils/parse-sales-by-provider-options'

import { FindSalesByProviderPerProductProviderUseCase } from './FindSalesByProviderPerProductProviderUseCase'

export class FindSalesByProviderPerProductProviderController {
  constructor(
    private findSalesByProviderPerProductProviderUseCase: FindSalesByProviderPerProductProviderUseCase
  ) {}

  async handle(req: FindSalesByProviderRequest, res: Response) {
    const { query } = req

    try {
      const productProviders = await this.findSalesByProviderPerProductProviderUseCase.execute(
        parseSalesByProviderOptions(query)
      )

      return res.json(productProviders)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
