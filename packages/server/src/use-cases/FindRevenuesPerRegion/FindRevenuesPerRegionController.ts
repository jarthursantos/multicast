import { Response } from 'express'
import {
  FindRevenuesRequest,
  parseRevenuesOptions
} from 'utils/parse-revenues-options'

import { FindRevenuesPerRegionUseCase } from './FindRevenuesPerRegionUseCase'

export class FindRevenuesPerRegionController {
  constructor(
    private findRevenuesPerRegionUseCase: FindRevenuesPerRegionUseCase
  ) {}

  async handle(req: FindRevenuesRequest, res: Response) {
    const { query } = req

    try {
      const regions = await this.findRevenuesPerRegionUseCase.execute(
        parseRevenuesOptions(query)
      )

      return res.json(regions)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
