import { Request, Response } from 'express'

import { FindClientsUseCase } from './FindClientsUseCase'

export class FindClientsController {
  constructor(private findClientsCase: FindClientsUseCase) {}

  async handle(_req: Request, res: Response) {
    try {
      const clients = await this.findClientsCase.execute()

      return res.json(clients)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
