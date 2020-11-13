import { Response } from 'express'
import {
  FindRevenuesRequest,
  parseRevenuesOptions
} from 'utils/parse-revenues-options'

import { FindRevenuesPerAnaliticUseCase } from './FindRevenuesPerAnaliticUseCase'

export class FindRevenuesPerAnaliticController {
  constructor(
    private findRevenuesPerAnaliticUseCase: FindRevenuesPerAnaliticUseCase
  ) {}

  async handle(req: FindRevenuesRequest, res: Response) {
    const { query } = req

    try {
      const analitics = await this.findRevenuesPerAnaliticUseCase.execute(
        parseRevenuesOptions(query)
      )

      return res.json(analitics)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
