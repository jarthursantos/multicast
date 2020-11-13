import { Request, Response } from 'express'

import { FindClientByCodeUseCase } from './FindClientByCodeUseCase'

export class FindClientByCodeController {
  constructor(private findClientByCodeCase: FindClientByCodeUseCase) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params

    try {
      const client = await this.findClientByCodeCase.execute(parseInt(id))

      return res.json(client)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
