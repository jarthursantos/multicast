import { Request, Response } from 'express'

import { FindRepresentativesUseCase } from './FindRepresentativesUseCase'

export class FindRepresentativesController {
  constructor(private findRepresentativesCase: FindRepresentativesUseCase) {}

  async handle(_: Request, res: Response) {
    try {
      const representatives = await this.findRepresentativesCase.execute()

      return res.json(representatives)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
