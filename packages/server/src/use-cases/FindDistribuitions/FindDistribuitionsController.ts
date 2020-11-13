import { Request, Response } from 'express'

import { FindDistribuitionsUseCase } from './FindDistribuitionsUseCase'

export class FindDistribuitionsController {
  constructor(private findDistribuitionsUseCase: FindDistribuitionsUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const distribuitions = await this.findDistribuitionsUseCase.execute()

      return res.json(distribuitions)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
