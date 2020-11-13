import { Response } from 'express'
import {
  FindRevenuesRequestWithID,
  parseRevenuesOptions
} from 'utils/parse-revenues-options'

import { FindRevenuesPerSalesOriginSupervisorUseCase } from './FindRevenuesPerSalesOriginSupervisorUseCase'

export class FindRevenuesPerSalesOriginSupervisorController {
  constructor(
    private findRevenuesPerSalesOriginSupervisorUseCase: FindRevenuesPerSalesOriginSupervisorUseCase
  ) {}

  async handle(req: FindRevenuesRequestWithID, res: Response) {
    const { query, params } = req
    const { id } = params

    try {
      const SalesOriginSupervisors = await this.findRevenuesPerSalesOriginSupervisorUseCase.execute(
        id,
        parseRevenuesOptions(query)
      )

      return res.json(SalesOriginSupervisors)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
