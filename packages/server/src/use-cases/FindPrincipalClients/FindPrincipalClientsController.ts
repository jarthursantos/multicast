import { Request, Response } from 'express'

import { FindPrincipalClientsUseCase } from './FindPrincipalClientsUseCase'

export class FindPrincipalClientsController {
  constructor(
    private findPrincipalClientsUseCase: FindPrincipalClientsUseCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const clients = await this.findPrincipalClientsUseCase.execute()

      return res.json(clients)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
