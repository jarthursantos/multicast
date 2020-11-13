import { Request, Response } from 'express'
import {
  parsePurchaseResumeOptions,
  FindPurchaseResumesQueryOptions
} from 'utils/parse-purchase-resume-options'

import { FindPurchaseResumesPerUFInvoicesUseCase } from './FindPurchaseResumesPerUFInvoicesUseCase'

export class FindPurchaseResumesPerUFInvoicesController {
  constructor(
    private findPurchaseResumesPerUFInvoicesUseCase: FindPurchaseResumesPerUFInvoicesUseCase
  ) {}

  async handle(
    req: Request<{ id: string }, {}, {}, FindPurchaseResumesQueryOptions>,
    res: Response
  ) {
    const { query, params } = req
    const { id } = params

    try {
      const UFs = await this.findPurchaseResumesPerUFInvoicesUseCase.execute(
        id,
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
