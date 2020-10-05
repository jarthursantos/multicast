import { Request, Response } from 'express'

import { FindAccompanimentByIdUseCase } from './FindAccompanimentByIdUseCase'

export class FindAccompanimentByIdController {
  constructor(private findAccompanimentsCase: FindAccompanimentByIdUseCase) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params

    try {
      const accompaniment = await this.findAccompanimentsCase.execute(id)

      return res.json(accompaniment)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
