import { Request, Response } from 'express'

import { ScheduleScheduleRequestsUseCase } from './ScheduleScheduleRequestsUseCase'

export class ScheduleScheduleRequestsController {
  constructor(
    private scheduleScheduleRequestsCase: ScheduleScheduleRequestsUseCase
  ) {}

  async handle(req: Request, res: Response) {
    const { auth, body, params } = req
    const { id } = params

    try {
      if (!auth.permissions.createSchedule) {
        throw new Error('Usuário sem acesso')
      }

      const schedule = await this.scheduleScheduleRequestsCase.execute(
        auth.user,
        id,
        body
      )

      return res.json(schedule)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
