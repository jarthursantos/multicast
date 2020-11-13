import { Request, Response } from 'express'
import {
  parsePurchaseResumeOptions,
  FindPurchaseResumesQueryOptions
} from 'utils/parse-purchase-resume-options'

import { FindPurchaseResumesPerEvolutionInvoicesUseCase } from './FindPurchaseResumesPerEvolutionInvoicesUseCase'

export class FindPurchaseResumesPerEvolutionInvoicesController {
  constructor(
    private findPurchaseResumesPerEvolutionInvoicesUseCase: FindPurchaseResumesPerEvolutionInvoicesUseCase
  ) {}

  async handle(
    req: Request<{ id: string }, {}, {}, FindPurchaseResumesQueryOptions>,
    res: Response
  ) {
    const { query, params } = req
    const { id } = params

    try {
      const evolutions = await this.findPurchaseResumesPerEvolutionInvoicesUseCase.execute(
        id,
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
