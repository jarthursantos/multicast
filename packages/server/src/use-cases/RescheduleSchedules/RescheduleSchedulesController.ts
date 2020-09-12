import { Request, Response } from 'express'

import { RescheduleSchedulesUseCase } from './RescheduleSchedulesUseCase'

export class RescheduleSchedulesController {
  constructor(private rescheduleSchedulesCase: RescheduleSchedulesUseCase) {}

  async handle(req: Request, res: Response) {
    const { auth, params, body } = req
    const { id } = params

    try {
      if (!auth.permissions.rescheduleSchedule) {
        throw new Error('Usuário sem acesso')
      }

      const reschedule = await this.rescheduleSchedulesCase.execute(id, body)

      return res.json(reschedule)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
