import { Request, Response } from 'express'
import {
  parsePurchaseResumeOptions,
  FindPurchaseResumesQueryOptions
} from 'utils/parse-purchase-resume-options'

import { FindPurchaseResumesPerProviderUseCase } from './FindPurchaseResumesPerProviderUseCase'

export class FindPurchaseResumesPerProviderController {
  constructor(
    private findPurchaseResumesPerProviderUseCase: FindPurchaseResumesPerProviderUseCase
  ) {}

  async handle(
    req: Request<{}, {}, {}, FindPurchaseResumesQueryOptions>,
    res: Response
  ) {
    const { query } = req

    try {
      const providers = await this.findPurchaseResumesPerProviderUseCase.execute(
        parsePurchaseResumeOptions(query)
      )

      return res.json(providers)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
