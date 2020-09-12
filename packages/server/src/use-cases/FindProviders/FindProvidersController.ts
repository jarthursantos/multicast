import { Request, Response } from 'express'

import { FindProvidersUseCase } from './FindProvidersUseCase'

export class FindProvidersController {
  constructor(private findProvidersCase: FindProvidersUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const providers = await this.findProvidersCase.execute()

      return res.json(providers)
    } catch (err) {
      return res.status(400).json({
        message: err.message || 'Unexpected error'
      })
    }
  }
}
