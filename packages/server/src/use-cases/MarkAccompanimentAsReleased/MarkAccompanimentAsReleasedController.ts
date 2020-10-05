import { Request, Response } from 'express'

import { MarkAccompanimentAsReleasedUseCase } from './MarkAccompanimentAsReleasedUseCase'

export class MarkAccompanimentAsReleasedController {
  constructor(
    private markAccompanimentAsReleasedCase: MarkAccompanimentAsReleasedUseCase
  ) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params

    try {
      const accompaniment = await this.markAccompanimentAsReleasedCase.execute(
        id
      )

      return res.json(accompaniment)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
