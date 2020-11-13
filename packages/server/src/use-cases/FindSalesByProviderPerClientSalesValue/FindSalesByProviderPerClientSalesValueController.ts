import { Response } from 'express'
import {
  FindSalesByProviderRequest,
  parseSalesByProviderOptions
} from 'utils/parse-sales-by-provider-options'

import { FindSalesByProviderPerClientSalesValueUseCase } from './FindSalesByProviderPerClientSalesValueUseCase'

export class FindSalesByProviderPerClientSalesValueController {
  constructor(
    private findSalesByProviderPerClientSalesValueUseCase: FindSalesByProviderPerClientSalesValueUseCase
  ) {}

  async handle(req: FindSalesByProviderRequest, res: Response) {
    const { query } = req

    try {
      const clientSalesValue = await this.findSalesByProviderPerClientSalesValueUseCase.execute(
        parseSalesByProviderOptions(query)
      )

      return res.json(clientSalesValue)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
