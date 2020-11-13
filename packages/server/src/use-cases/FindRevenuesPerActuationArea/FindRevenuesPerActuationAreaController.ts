import { Response } from 'express'
import {
  FindRevenuesRequest,
  parseRevenuesOptions
} from 'utils/parse-revenues-options'

import { FindRevenuesPerActuationAreaUseCase } from './FindRevenuesPerActuationAreaUseCase'

export class FindRevenuesPerActuationAreaController {
  constructor(
    private findRevenuesPerActuationAreaUseCase: FindRevenuesPerActuationAreaUseCase
  ) {}

  async handle(req: FindRevenuesRequest, res: Response) {
    const { query } = req

    try {
      const actuationAreas = await this.findRevenuesPerActuationAreaUseCase.execute(
        parseRevenuesOptions(query)
      )

      return res.json(actuationAreas)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
