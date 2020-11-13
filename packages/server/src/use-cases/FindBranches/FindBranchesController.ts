import { Request, Response } from 'express'

import { FindBranchesUseCase } from './FindBranchesUseCase'

export class FindBranchesController {
  constructor(private findBranchesCase: FindBranchesUseCase) {}

  async handle(_req: Request, res: Response) {
    try {
      const branches = await this.findBranchesCase.execute()

      return res.json(branches)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unepected error'
      })
    }
  }
}
