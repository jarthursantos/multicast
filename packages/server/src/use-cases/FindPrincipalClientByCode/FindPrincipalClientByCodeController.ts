import { Request, Response } from 'express'

import { FindPrincipalClientByCodeUseCase } from './FindPrincipalClientByCodeUseCase'

export class FindPrincipalClientByCodeController {
  constructor(
    private findPrincipalClientByCodeUseCase: FindPrincipalClientByCodeUseCase
  ) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params

    try {
      const client = await this.findPrincipalClientByCodeUseCase.execute(
        parseInt(id)
      )

      return res.json(client)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
