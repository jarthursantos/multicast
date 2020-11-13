import { Response } from 'express'
import {
  FindRevenuesRequest,
  parseRevenuesOptions
} from 'utils/parse-revenues-options'

import { FindRevenuesPerEmitterUseCase } from './FindRevenuesPerEmitterUseCase'

export class FindRevenuesPerEmitterController {
  constructor(
    private findRevenuesPerEmitterUseCase: FindRevenuesPerEmitterUseCase
  ) {}

  async handle(req: FindRevenuesRequest, res: Response) {
    const { query } = req

    try {
      const emitters = await this.findRevenuesPerEmitterUseCase.execute(
        parseRevenuesOptions(query)
      )

      return res.json(emitters)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
