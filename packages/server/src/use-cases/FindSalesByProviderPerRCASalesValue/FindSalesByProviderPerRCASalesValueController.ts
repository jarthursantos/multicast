import { Response } from 'express'
import {
  FindSalesByProviderRequest,
  parseSalesByProviderOptions
} from 'utils/parse-sales-by-provider-options'

import { FindSalesByProviderPerRCASalesValueUseCase } from './FindSalesByProviderPerRCASalesValueUseCase'

export class FindSalesByProviderPerRCASalesValueController {
  constructor(
    private findSalesByProviderPerRCASalesValueUseCase: FindSalesByProviderPerRCASalesValueUseCase
  ) {}

  async handle(req: FindSalesByProviderRequest, res: Response) {
    const { query } = req

    try {
      const RCASalesValues = await this.findSalesByProviderPerRCASalesValueUseCase.execute(
        parseSalesByProviderOptions(query)
      )

      return res.json(RCASalesValues)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
