import { Response } from 'express'
import {
  FindSalesByProviderRequest,
  parseSalesByProviderOptions
} from 'utils/parse-sales-by-provider-options'

import { FindSalesByProviderPerSupervisorRCAUseCase } from './FindSalesByProviderPerSupervisorRCAUseCase'

export class FindSalesByProviderPerSupervisorRCAController {
  constructor(
    private findSalesByProviderPerSupervisorRCAUseCase: FindSalesByProviderPerSupervisorRCAUseCase
  ) {}

  async handle(req: FindSalesByProviderRequest, res: Response) {
    const { query } = req

    try {
      const supervisorRCAs = await this.findSalesByProviderPerSupervisorRCAUseCase.execute(
        parseSalesByProviderOptions(query)
      )

      return res.json(supervisorRCAs)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
