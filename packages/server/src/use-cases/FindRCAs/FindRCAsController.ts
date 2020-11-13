import { Request, Response } from 'express'

import { FindRCAsUseCase } from './FindRCAsUseCase'

export class FindRCAsController {
  constructor(private findRCAsUseCase: FindRCAsUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const rcas = await this.findRCAsUseCase.execute()

      return res.json(rcas)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
