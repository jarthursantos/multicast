import { Request, Response } from 'express'

import { CancelSchedulesUseCase } from './CancelSchedulesUseCase'

export class CancelSchedulesController {
  constructor(private cancelScheduleCase: CancelSchedulesUseCase) {}

  async handle(req: Request, res: Response) {
    const { params, body, auth } = req
    const { id } = params

    try {
      if (!auth.permissions.cancelSchedule) {
        throw new Error('Usuário sem acesso')
      }

      const canceled = await this.cancelScheduleCase.execute(id, body)

      return res.json(canceled)
    } catch (err) {
      return res.status(400).json({
        message: err.message || 'Unexpected error'
      })
    }
  }
}
