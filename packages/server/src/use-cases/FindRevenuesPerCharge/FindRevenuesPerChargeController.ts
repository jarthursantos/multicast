import { Response } from 'express'
import {
  FindRevenuesRequest,
  parseRevenuesOptions
} from 'utils/parse-revenues-options'

import { FindRevenuesPerChargeUseCase } from './FindRevenuesPerChargeUseCase'

export class FindRevenuesPerChargeController {
  constructor(
    private findRevenuesPerChargeUseCase: FindRevenuesPerChargeUseCase
  ) {}

  async handle(req: FindRevenuesRequest, res: Response) {
    const { query } = req

    try {
      const charges = await this.findRevenuesPerChargeUseCase.execute(
        parseRevenuesOptions(query)
      )

      return res.json(charges)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
