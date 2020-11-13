import { Request, Response } from 'express'

import { FindRegionsUseCase } from './FindRegionsUseCase'

export class FindRegionsController {
  constructor(private findRegionsUseCase: FindRegionsUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const regions = await this.findRegionsUseCase.execute()

      return res.json(regions)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
