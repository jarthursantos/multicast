import { Request, Response } from 'express'
import {
  parsePurchaseResumeOptions,
  FindPurchaseResumesQueryOptions
} from 'utils/parse-purchase-resume-options'

import { FindPurchaseResumesPerBuyerUseCase } from './FindPurchaseResumesPerBuyerUseCase'

export class FindPurchaseResumesPerBuyerController {
  constructor(
    private findPurchaseResumesPerBuyerUseCase: FindPurchaseResumesPerBuyerUseCase
  ) {}

  async handle(
    req: Request<{}, {}, {}, FindPurchaseResumesQueryOptions>,
    res: Response
  ) {
    const { query } = req

    try {
      const buyers = await this.findPurchaseResumesPerBuyerUseCase.execute(
        parsePurchaseResumeOptions(query)
      )

      return res.json(buyers)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
