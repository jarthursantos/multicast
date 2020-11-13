import { Response } from 'express'
import {
  FindRevenuesRequest,
  parseRevenuesOptions
} from 'utils/parse-revenues-options'

import { FindRevenuesPerEvolutionUseCase } from './FindRevenuesPerEvolutionUseCase'

export class FindRevenuesPerEvolutionController {
  constructor(
    private findRevenuesPerEvolutionUseCase: FindRevenuesPerEvolutionUseCase
  ) {}

  async handle(req: FindRevenuesRequest, res: Response) {
    const { query } = req

    try {
      const evolutions = await this.findRevenuesPerEvolutionUseCase.execute(
        parseRevenuesOptions(query)
      )

      return res.json(evolutions)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
