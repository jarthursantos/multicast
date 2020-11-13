import { Request, Response } from 'express'

import { FindSalesClassesUseCase } from './FindSalesClassesUseCase'

export class FindSalesClassesController {
  constructor(private findSalesClassesCase: FindSalesClassesUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const classes = await this.findSalesClassesCase.execute()

      return res.json(classes)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
