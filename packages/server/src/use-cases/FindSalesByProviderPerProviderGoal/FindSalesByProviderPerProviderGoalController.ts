import { Response } from 'express'
import {
  FindSalesByProviderRequest,
  parseSalesByProviderOptions
} from 'utils/parse-sales-by-provider-options'

import { FindSalesByProviderPerProviderGoalUseCase } from './FindSalesByProviderPerProviderGoalUseCase'

export class FindSalesByProviderPerProviderGoalController {
  constructor(
    private findSalesByProviderPerProviderGoalUseCase: FindSalesByProviderPerProviderGoalUseCase
  ) {}

  async handle(req: FindSalesByProviderRequest, res: Response) {
    const { query } = req

    try {
      const providerGoals = await this.findSalesByProviderPerProviderGoalUseCase.execute(
        parseSalesByProviderOptions(query)
      )

      return res.json(providerGoals)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
