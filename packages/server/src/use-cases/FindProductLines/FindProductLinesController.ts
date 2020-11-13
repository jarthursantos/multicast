import { Request, Response } from 'express'

import { FindProductLinesUseCase } from './FindProductLinesUseCase'

export class FindProductLinesController {
  constructor(private findProductLinesUseCase: FindProductLinesUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const lines = await this.findProductLinesUseCase.execute()

      return res.json(lines)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
