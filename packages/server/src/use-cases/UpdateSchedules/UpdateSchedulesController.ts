import { Request, Response } from 'express'

import { UpdateSchedulesUseCase } from './UpdateSchedulesUseCase'

export class UpdateSchedulesController {
  constructor(private updateSchedulesCase: UpdateSchedulesUseCase) {}

  async handle(req: Request, res: Response) {
    const { auth, body, params } = req
    const { id } = params

    try {
      if (!auth.permissions.createSchedule) {
        throw new Error('Usuário sem acesso')
      }

      const schedule = await this.updateSchedulesCase.execute(
        auth.user,
        id,
        body
      )

      return res.json(schedule)
    } catch (err) {
      return res.status(400).json({
        message: err.message || 'Unexpected error'
      })
    }
  }
}
