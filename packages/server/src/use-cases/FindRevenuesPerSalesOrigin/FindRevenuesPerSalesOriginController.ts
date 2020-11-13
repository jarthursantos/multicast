import { Response } from 'express'
import {
  FindRevenuesRequest,
  parseRevenuesOptions
} from 'utils/parse-revenues-options'

import { FindRevenuesPerSalesOriginUseCase } from './FindRevenuesPerSalesOriginUseCase'

export class FindRevenuesPerSalesOriginController {
  constructor(
    private findRevenuesPerSalesOriginUseCase: FindRevenuesPerSalesOriginUseCase
  ) {}

  async handle(req: FindRevenuesRequest, res: Response) {
    const { query } = req

    try {
      const SalesOrigins = await this.findRevenuesPerSalesOriginUseCase.execute(
        parseRevenuesOptions(query)
      )

      return res.json(SalesOrigins)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
