import { Request, Response } from 'express'

import { FindActivityBranchByCodeUseCase } from './FindActivityBranchByCodeUseCase'

export class FindActivityBranchByCodeController {
  constructor(
    private findActivityBranchByCodeUseCase: FindActivityBranchByCodeUseCase
  ) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params

    try {
      const activity = await this.findActivityBranchByCodeUseCase.execute(
        parseInt(id)
      )

      return res.json(activity)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
