import { Response } from 'express'
import {
  FindSalesByProviderRequest,
  parseSalesByProviderOptions
} from 'utils/parse-sales-by-provider-options'

import { FindSalesByProviderPerClientUseCase } from './FindSalesByProviderPerClientUseCase'

export class FindSalesByProviderPerClientController {
  constructor(
    private findSalesByProviderPerClientUseCase: FindSalesByProviderPerClientUseCase
  ) {}

  async handle(req: FindSalesByProviderRequest, res: Response) {
    const { query } = req

    try {
      const clients = await this.findSalesByProviderPerClientUseCase.execute(
        parseSalesByProviderOptions(query)
      )

      return res.json(clients)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
