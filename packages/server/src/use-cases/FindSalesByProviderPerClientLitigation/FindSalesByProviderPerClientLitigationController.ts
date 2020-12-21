import { Response } from 'express'
import {
  FindSalesByProviderRequest,
  parseSalesByProviderOptions
} from 'utils/parse-sales-by-provider-options'

import { FindSalesByProviderPerClientLitigationUseCase } from './FindSalesByProviderPerClientLitigationUseCase'

export class FindSalesByProviderPerClientLitigationController {
  constructor(
    private findSalesByProviderPerClientLitigationUseCase: FindSalesByProviderPerClientLitigationUseCase
  ) {}

  async handle(req: FindSalesByProviderRequest, res: Response) {
    const { query } = req

    try {
      const clientLitigations = await this.findSalesByProviderPerClientLitigationUseCase.execute(
        parseSalesByProviderOptions(query)
      )

      return res.json(clientLitigations)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
