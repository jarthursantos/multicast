import { Request, Response } from 'express'

import { GenerateScheduleCostsReportsUseCase } from './GenerateScheduleCostsReportsUseCase'

export class GenerateScheduleCostsReportsController {
  constructor(
    private generateScheduleCostsReportsCase: GenerateScheduleCostsReportsUseCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const report = await this.generateScheduleCostsReportsCase.execute(
        req.body
      )

      return res.json(report)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
