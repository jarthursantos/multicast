import { Request, Response } from 'express'

import { FindDistribuitionByCodeUseCase } from './FindDistribuitionByCodeUseCase'

export class FindDistribuitionByCodeController {
  constructor(
    private findDistribuitionByCodeUseCase: FindDistribuitionByCodeUseCase
  ) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params

    try {
      const distribuition = await this.findDistribuitionByCodeUseCase.execute(
        id
      )

      return res.json(distribuition)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
