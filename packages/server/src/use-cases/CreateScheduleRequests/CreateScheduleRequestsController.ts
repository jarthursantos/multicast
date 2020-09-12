import { Request, Response } from 'express'

import { CreateSchedulesRequestUseCase } from './CreateScheduleRequestsUseCase'

export class CreateScheduleRequestsController {
  constructor(
    private createScheduleRequestCase: CreateSchedulesRequestUseCase
  ) {}

  async handle(req: Request, res: Response) {
    const { body, auth } = req

    try {
      if (!auth.permissions.createRequest) {
        throw new Error('Usuário sem acesso')
      }

      const request = await this.createScheduleRequestCase.execute(
        auth.user,
        body
      )

      return res.json(request)
    } catch (err) {
      return res.status(400).json({
        message: err.message || 'Unexpected error'
      })
    }
  }
}
