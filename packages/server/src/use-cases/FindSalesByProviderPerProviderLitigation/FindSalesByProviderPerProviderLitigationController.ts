import { Response } from 'express'
import {
  FindSalesByProviderRequest,
  parseSalesByProviderOptions
} from 'utils/parse-sales-by-provider-options'

import { FindSalesByProviderPerProviderLitigationUseCase } from './FindSalesByProviderPerProviderLitigationUseCase'

export class FindSalesByProviderPerProviderLitigationController {
  constructor(
    private findSalesByProviderPerProviderLitigationUseCase: FindSalesByProviderPerProviderLitigationUseCase
  ) {}

  async handle(req: FindSalesByProviderRequest, res: Response) {
    const { query } = req

    try {
      const providerLitigations = await this.findSalesByProviderPerProviderLitigationUseCase.execute(
        parseSalesByProviderOptions(query)
      )

      return res.json(providerLitigations)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
