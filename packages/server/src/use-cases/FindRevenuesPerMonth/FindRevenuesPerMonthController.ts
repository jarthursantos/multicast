import { Response } from 'express'
import {
  FindRevenuesRequest,
  parseRevenuesOptions
} from 'utils/parse-revenues-options'

import { FindRevenuesPerMonthUseCase } from './FindRevenuesPerMonthUseCase'

export class FindRevenuesPerMonthController {
  constructor(
    private findRevenuesPerMonthUseCase: FindRevenuesPerMonthUseCase
  ) {}

  async handle(req: FindRevenuesRequest, res: Response) {
    const { query } = req

    try {
      const months = await this.findRevenuesPerMonthUseCase.execute(
        parseRevenuesOptions(query)
      )

      return res.json(months)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
