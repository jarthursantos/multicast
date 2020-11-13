import { Request, Response } from 'express'

import { FindBrandsUseCase } from './FindBrandsUseCase'

export class FindBrandsController {
  constructor(private findBrandsUseCase: FindBrandsUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const brands = await this.findBrandsUseCase.execute()

      return res.json(brands)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
