import { Request, Response } from 'express'

import { FindProviderByIdUseCase } from './FindProviderByIdUseCase'

export class FindProviderByIdController {
  constructor(private findProviderByIdCase: FindProviderByIdUseCase) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params

    try {
      const request = await this.findProviderByIdCase.execute(parseInt(id))

      return res.json(request)
    } catch (err) {
      return res.status(400).json({
        message: err.message || 'Unexpected error'
      })
    }
  }
}
