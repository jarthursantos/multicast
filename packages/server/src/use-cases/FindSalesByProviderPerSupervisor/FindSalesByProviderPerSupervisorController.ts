import { Response } from 'express'
import {
  FindSalesByProviderRequest,
  parseSalesByProviderOptions
} from 'utils/parse-sales-by-provider-options'

import { FindSalesByProviderPerSupervisorUseCase } from './FindSalesByProviderPerSupervisorUseCase'

export class FindSalesByProviderPerSupervisorController {
  constructor(
    private findSalesByProviderPerSupervisorUseCase: FindSalesByProviderPerSupervisorUseCase
  ) {}

  async handle(req: FindSalesByProviderRequest, res: Response) {
    const { query } = req

    try {
      const supervisors = await this.findSalesByProviderPerSupervisorUseCase.execute(
        parseSalesByProviderOptions(query)
      )

      return res.json(supervisors)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
