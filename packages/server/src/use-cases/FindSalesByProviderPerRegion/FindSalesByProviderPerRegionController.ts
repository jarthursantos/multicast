import { Response } from 'express'
import {
  FindSalesByProviderRequest,
  parseSalesByProviderOptions
} from 'utils/parse-sales-by-provider-options'

import { FindSalesByProviderPerRegionUseCase } from './FindSalesByProviderPerRegionUseCase'

export class FindSalesByProviderPerRegionController {
  constructor(
    private findSalesByProviderPerRegionUseCase: FindSalesByProviderPerRegionUseCase
  ) {}

  async handle(req: FindSalesByProviderRequest, res: Response) {
    const { query } = req

    try {
      const regions = await this.findSalesByProviderPerRegionUseCase.execute(
        parseSalesByProviderOptions(query)
      )

      return res.json(regions)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
