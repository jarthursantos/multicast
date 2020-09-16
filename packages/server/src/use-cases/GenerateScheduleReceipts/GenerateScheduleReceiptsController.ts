import { Request, Response } from 'express'

import { GenerateScheduleReceiptsUseCase } from './GenerateScheduleReceiptsUseCase'

export class GenerateScheduleReceiptsController {
  constructor(
    private generateScheduleReceiptsCase: GenerateScheduleReceiptsUseCase
  ) {}

  async handle(req: Request, res: Response) {
    const { id } = req.params

    try {
      const receipt = await this.generateScheduleReceiptsCase.execute(id)

      return res.json(receipt)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
