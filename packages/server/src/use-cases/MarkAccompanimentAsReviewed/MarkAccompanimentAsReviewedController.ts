import { Request, Response } from 'express'

import { MarkAccompanimentAsReviewedUseCase } from './MarkAccompanimentAsReviewedUseCase'

export class MarkAccompanimentAsReviewedController {
  constructor(
    private markAccompanimentAsReviewedCase: MarkAccompanimentAsReviewedUseCase
  ) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params

    try {
      const accompaniment = await this.markAccompanimentAsReviewedCase.execute(
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
