import { Request, Response } from 'express'

import { FindPrincipalProvidersUseCase } from './FindPrincipalProvidersUseCase'

export class FindPrincipalProvidersController {
  constructor(
    private findPrincipalProvidersCase: FindPrincipalProvidersUseCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const providers = await this.findPrincipalProvidersCase.execute()

      return res.json(providers)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
