import { Request, Response } from 'express'

import { FindRegionByCodeUseCase } from './FindRegionByCodeUseCase'

export class FindRegionByCodeController {
  constructor(private findRegionByCodeUseCase: FindRegionByCodeUseCase) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params

    try {
      const region = await this.findRegionByCodeUseCase.execute(parseInt(id))

      return res.json(region)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
