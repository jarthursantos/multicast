import { Request, Response } from 'express'

import { FindActivityBranchesUseCase } from './FindActivityBranchesUseCase'

export class FindActivityBranchesController {
  constructor(
    private findActivityBranchesUseCase: FindActivityBranchesUseCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const activities = await this.findActivityBranchesUseCase.execute()

      return res.json(activities)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
