import { Request, Response } from 'express'

import { FindClientWebsUseCase } from './FindClientWebsUseCase'

export class FindClientWebsController {
  constructor(private findClientWebsUseCase: FindClientWebsUseCase) {}

  async handle(req: Request, res: Response) {
    try {
      const webs = await this.findClientWebsUseCase.execute()

      return res.json(webs)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
