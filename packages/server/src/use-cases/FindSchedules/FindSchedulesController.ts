import { Request, Response } from 'express'

import { FindSchedulesUseCase } from './FindSchedulesUseCase'

export class FindSchedulesController {
  constructor(private findSchedulesCase: FindSchedulesUseCase) {}

  async handle(req: Request, res: Response) {
    const { auth } = req

    try {
      if (!auth.permissions.accessSchedules) {
        throw new Error('Usuário sem acesso')
      }

      const schedules = await this.findSchedulesCase.execute()

      return res.json(schedules)
    } catch (err) {
      return res.status(400).json({
        message: err.message || 'Unexpected error'
      })
    }
  }
}
