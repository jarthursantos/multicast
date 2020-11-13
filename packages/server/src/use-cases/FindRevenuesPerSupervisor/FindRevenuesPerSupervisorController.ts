import { Response } from 'express'
import {
  FindRevenuesRequest,
  parseRevenuesOptions
} from 'utils/parse-revenues-options'

import { FindRevenuesPerSupervisorUseCase } from './FindRevenuesPerSupervisorUseCase'

export class FindRevenuesPerSupervisorController {
  constructor(
    private findRevenuesPerSupervisorUseCase: FindRevenuesPerSupervisorUseCase
  ) {}

  async handle(req: FindRevenuesRequest, res: Response) {
    const { query } = req

    try {
      const supervisores = await this.findRevenuesPerSupervisorUseCase.execute(
        parseRevenuesOptions(query)
      )

      return res.json(supervisores)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
