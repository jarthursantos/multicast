import { Request, Response } from 'express'
import {
  parsePurchaseResumeOptions,
  FindPurchaseResumesQueryOptions
} from 'utils/parse-purchase-resume-options'

import { FindPurchaseResumesPerProviderInvoicesUseCase } from './FindPurchaseResumesPerProviderInvoicesUseCase'

export class FindPurchaseResumesPerProviderInvoicesController {
  constructor(
    private findPurchaseResumesPerProviderInvoicesUseCase: FindPurchaseResumesPerProviderInvoicesUseCase
  ) {}

  async handle(
    req: Request<{ id: string }, {}, {}, FindPurchaseResumesQueryOptions>,
    res: Response
  ) {
    const { query, params } = req
    const { id } = params

    try {
      const providers = await this.findPurchaseResumesPerProviderInvoicesUseCase.execute(
        parseInt(id),
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
