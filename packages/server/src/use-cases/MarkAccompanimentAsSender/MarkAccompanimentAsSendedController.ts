import { Request, Response } from 'express'

import { MarkAccompanimentAsSendedUseCase } from './MarkAccompanimentAsSendedUseCase'

export class MarkAccompanimentAsSendedController {
  constructor(
    private markAccompanimentAsSendedCase: MarkAccompanimentAsSendedUseCase
  ) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params

    try {
      const accompaniment = await this.markAccompanimentAsSendedCase.execute(id)

      return res.json(accompaniment)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
