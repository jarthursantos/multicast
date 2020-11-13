import { Response } from 'express'
import {
  FindRevenuesRequest,
  parseRevenuesOptions
} from 'utils/parse-revenues-options'

import { FindRevenuesPerProviderUseCase } from './FindRevenuesPerProviderUseCase'

export class FindRevenuesPerProviderController {
  constructor(
    private findRevenuesPerProviderUseCase: FindRevenuesPerProviderUseCase
  ) {}

  async handle(req: FindRevenuesRequest, res: Response) {
    const { query } = req

    try {
      const providers = await this.findRevenuesPerProviderUseCase.execute(
        parseRevenuesOptions(query)
      )

      return res.json(providers)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
