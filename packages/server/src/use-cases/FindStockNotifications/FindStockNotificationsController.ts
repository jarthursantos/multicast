import { Request, Response } from 'express'

import { FindStockNotificationsUseCase } from './FindStockNotificationsUseCase'

export class FindStockNotificationsController {
  constructor(
    private findStockNotificationsCase: FindStockNotificationsUseCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const result = await this.findStockNotificationsCase.generate(req.body)

      return res.json(result)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
