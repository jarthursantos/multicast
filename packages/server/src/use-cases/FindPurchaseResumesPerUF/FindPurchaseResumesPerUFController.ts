import { Request, Response } from 'express'
import {
  parsePurchaseResumeOptions,
  FindPurchaseResumesQueryOptions
} from 'utils/parse-purchase-resume-options'

import { FindPurchaseResumesPerUFUseCase } from './FindPurchaseResumesPerUFUseCase'

export class FindPurchaseResumesPerUFController {
  constructor(
    private findPurchaseResumesPerUFUseCase: FindPurchaseResumesPerUFUseCase
  ) {}

  async handle(
    req: Request<{}, {}, {}, FindPurchaseResumesQueryOptions>,
    res: Response
  ) {
    const { query } = req

    try {
      const UFs = await this.findPurchaseResumesPerUFUseCase.execute(
        parsePurchaseResumeOptions(query)
      )

      return res.json(UFs)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
