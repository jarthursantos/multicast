import { Request, Response } from 'express'

import { FindPrincipalProviderByCodeUseCase } from './FindPrincipalProviderByCodeUseCase'

export class FindPrincipalProviderByCodeController {
  constructor(
    private findPrincipalProviderByCodeCase: FindPrincipalProviderByCodeUseCase
  ) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params

    try {
      const provider = await this.findPrincipalProviderByCodeCase.execute(
        parseInt(id)
      )

      return res.json(provider)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
