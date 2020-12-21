import { Request, Response } from 'express'

import { FindProvidersUseCase } from './FindProvidersUseCase'

export class FindProvidersController {
  constructor(private findProvidersCase: FindProvidersUseCase) {}

  async handle(req: Request<{}, {}, {}, { query?: string }>, res: Response) {
    const { query } = req.query

    try {
      const providers = await this.findProvidersCase.execute(query)

      return res.json(providers)
    } catch (err) {
      return res.status(400).json({
        message: err.message || 'Unexpected error'
      })
    }
  }
}
