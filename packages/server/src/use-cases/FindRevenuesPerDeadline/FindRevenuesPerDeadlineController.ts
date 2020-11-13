import { Response } from 'express'
import {
  FindRevenuesRequest,
  parseRevenuesOptions
} from 'utils/parse-revenues-options'

import { FindRevenuesPerDeadlineUseCase } from './FindRevenuesPerDeadlineUseCase'

export class FindRevenuesPerDeadlineController {
  constructor(
    private findRevenuesPerDeadlineUseCase: FindRevenuesPerDeadlineUseCase
  ) {}

  async handle(req: FindRevenuesRequest, res: Response) {
    const { query } = req

    try {
      const deadlines = await this.findRevenuesPerDeadlineUseCase.execute(
        parseRevenuesOptions(query)
      )

      return res.json(deadlines)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
