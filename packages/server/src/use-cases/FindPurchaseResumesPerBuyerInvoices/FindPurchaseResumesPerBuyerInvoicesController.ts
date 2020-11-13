import { Request, Response } from 'express'
import {
  parsePurchaseResumeOptions,
  FindPurchaseResumesQueryOptions
} from 'utils/parse-purchase-resume-options'

import { FindPurchaseResumesPerBuyerInvoicesUseCase } from './FindPurchaseResumesPerBuyerInvoicesUseCase'

export class FindPurchaseResumesPerBuyerInvoicesController {
  constructor(
    private findPurchaseResumesPerBuyerInvoicesUseCase: FindPurchaseResumesPerBuyerInvoicesUseCase
  ) {}

  async handle(
    req: Request<{ id: string }, {}, {}, FindPurchaseResumesQueryOptions>,
    res: Response
  ) {
    const { query, params } = req
    const { id } = params

    try {
      const buyers = await this.findPurchaseResumesPerBuyerInvoicesUseCase.execute(
        parseInt(id),
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
