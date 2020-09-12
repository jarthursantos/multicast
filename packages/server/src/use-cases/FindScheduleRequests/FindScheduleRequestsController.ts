import { Request, Response } from 'express'

import { FindScheduleRequestsUseCase } from './FindScheduleRequestsUseCase'

export class FindScheduleRequestsController {
  constructor(private findScheduleRequestCase: FindScheduleRequestsUseCase) {}

  async handle(req: Request, res: Response) {
    const { auth } = req
    try {
      if (!auth.permissions.accessSchedules) {
        throw new Error('Usuário sem acesso')
      }

      const requests = await this.findScheduleRequestCase.execute()

      return res.json(requests)
    } catch (err) {
      return res.status(400).json({
        message: err.message || 'Unexpected error'
      })
    }
  }
}
