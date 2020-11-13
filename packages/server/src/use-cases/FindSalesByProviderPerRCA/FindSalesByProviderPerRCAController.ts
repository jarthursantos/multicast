import { Response } from 'express'
import {
  FindSalesByProviderRequest,
  parseSalesByProviderOptions
} from 'utils/parse-sales-by-provider-options'

import { FindSalesByProviderPerRCAUseCase } from './FindSalesByProviderPerRCAUseCase'

export class FindSalesByProviderPerRCAController {
  constructor(
    private findSalesByProviderPerRCAUseCase: FindSalesByProviderPerRCAUseCase
  ) {}

  async handle(req: FindSalesByProviderRequest, res: Response) {
    const { query } = req

    try {
      const RCAs = await this.findSalesByProviderPerRCAUseCase.execute(
        parseSalesByProviderOptions(query)
      )

      return res.json(RCAs)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
