import { Response } from 'express'
import {
  FindRevenuesRequest,
  parseRevenuesOptions
} from 'utils/parse-revenues-options'

import { FindRevenuesPerCheckOutUseCase } from './FindRevenuesPerCheckOutUseCase'

export class FindRevenuesPerCheckOutController {
  constructor(
    private findRevenuesPerCheckOutUseCase: FindRevenuesPerCheckOutUseCase
  ) {}

  async handle(req: FindRevenuesRequest, res: Response) {
    const { query } = req

    try {
      const checkOuts = await this.findRevenuesPerCheckOutUseCase.execute(
        parseRevenuesOptions(query)
      )

      return res.json(checkOuts)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
