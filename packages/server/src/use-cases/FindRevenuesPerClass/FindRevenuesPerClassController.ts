import { Response } from 'express'
import {
  FindRevenuesRequest,
  parseRevenuesOptions
} from 'utils/parse-revenues-options'

import { FindRevenuesPerClassUseCase } from './FindRevenuesPerClassUseCase'

export class FindRevenuesPerClassController {
  constructor(
    private findRevenuesPerClassUseCase: FindRevenuesPerClassUseCase
  ) {}

  async handle(req: FindRevenuesRequest, res: Response) {
    const { query } = req

    try {
      const classs = await this.findRevenuesPerClassUseCase.execute(
        parseRevenuesOptions(query)
      )

      return res.json(classs)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
