import { Response } from 'express'
import {
  FindStockNotificationsRequest,
  parseStockNotificationsOptions
} from 'utils/parse-stock-notifications-options'

import { FindStockNotificationsUseCase } from './FindStockNotificationsUseCase'

export class FindStockNotificationsController {
  constructor(
    private findStockNotificationsCase: FindStockNotificationsUseCase
  ) {}

  async handle(req: FindStockNotificationsRequest, res: Response) {
    const { query } = req

    try {
      const result = await this.findStockNotificationsCase.generate(
        parseStockNotificationsOptions(query)
      )

      return res.json(result)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
