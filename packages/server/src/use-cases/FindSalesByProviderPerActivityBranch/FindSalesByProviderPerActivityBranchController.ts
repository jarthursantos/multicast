import { Response } from 'express'
import {
  FindSalesByProviderRequest,
  parseSalesByProviderOptions
} from 'utils/parse-sales-by-provider-options'

import { FindSalesByProviderPerActivityBranchUseCase } from './FindSalesByProviderPerActivityBranchUseCase'

export class FindSalesByProviderPerActivityBranchController {
  constructor(
    private findSalesByProviderPerActivityBranchUseCase: FindSalesByProviderPerActivityBranchUseCase
  ) {}

  async handle(req: FindSalesByProviderRequest, res: Response) {
    const { query } = req

    try {
      const activityBranches = await this.findSalesByProviderPerActivityBranchUseCase.execute(
        parseSalesByProviderOptions(query)
      )

      return res.json(activityBranches)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
