import { Response } from 'express'

import {
  parseBillsToPayOptions,
  FindBillsToPayRequest
} from './FindBillstoPayParser'
import { FindBillsToPayUseCase } from './FindBillsToPayUseCase'

export class FindBillsToPayController {
  constructor(private findBillsToPayCase: FindBillsToPayUseCase) {}

  async handle(req: FindBillsToPayRequest, res: Response) {
    const { query, params } = req
    const { month, year } = params

    try {
      const bills = await this.findBillsToPayCase.execute(
        parseBillsToPayOptions(query),
        parseInt(month),
        parseInt(year)
      )

      return res.json(bills)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
