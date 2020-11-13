import { Request, Response } from 'express'
import {
  parsePurchaseResumeOptions,
  FindPurchaseResumesQueryOptions
} from 'utils/parse-purchase-resume-options'

import { FindPurchaseResumesPerEvolutionUseCase } from './FindPurchaseResumesPerEvolutionUseCase'

export class FindPurchaseResumesPerEvolutionController {
  constructor(
    private findPurchaseResumesPerEvolutionUseCase: FindPurchaseResumesPerEvolutionUseCase
  ) {}

  async handle(
    req: Request<{}, {}, {}, FindPurchaseResumesQueryOptions>,
    res: Response
  ) {
    const { query } = req

    try {
      const evolutions = await this.findPurchaseResumesPerEvolutionUseCase.execute(
        parsePurchaseResumeOptions(query)
      )

      return res.json(evolutions)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
