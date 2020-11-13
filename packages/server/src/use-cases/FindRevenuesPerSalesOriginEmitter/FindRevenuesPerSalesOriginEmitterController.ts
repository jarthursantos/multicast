import { Response } from 'express'
import {
  FindRevenuesRequestWithID,
  parseRevenuesOptions
} from 'utils/parse-revenues-options'

import { FindRevenuesPerSalesOriginEmitterUseCase } from './FindRevenuesPerSalesOriginEmitterUseCase'

export class FindRevenuesPerSalesOriginEmitterController {
  constructor(
    private findRevenuesPerSalesOriginEmitterUseCase: FindRevenuesPerSalesOriginEmitterUseCase
  ) {}

  async handle(req: FindRevenuesRequestWithID, res: Response) {
    const { query, params } = req
    const { id } = params

    try {
      const SalesOriginEmitters = await this.findRevenuesPerSalesOriginEmitterUseCase.execute(
        id,
        parseRevenuesOptions(query)
      )

      return res.json(SalesOriginEmitters)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
