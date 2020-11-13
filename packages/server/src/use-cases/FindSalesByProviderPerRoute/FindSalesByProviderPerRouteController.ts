import { Response } from 'express'
import {
  FindSalesByProviderRequest,
  parseSalesByProviderOptions
} from 'utils/parse-sales-by-provider-options'

import { FindSalesByProviderPerRouteUseCase } from './FindSalesByProviderPerRouteUseCase'

export class FindSalesByProviderPerRouteController {
  constructor(
    private findSalesByProviderPerRouteUseCase: FindSalesByProviderPerRouteUseCase
  ) {}

  async handle(req: FindSalesByProviderRequest, res: Response) {
    const { query } = req

    try {
      const routes = await this.findSalesByProviderPerRouteUseCase.execute(
        parseSalesByProviderOptions(query)
      )

      return res.json(routes)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
