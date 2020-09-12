import { Request, Response } from 'express'

import { CreateSchedulesUseCase } from './CreateSchedulesUseCase'

export class CreateSchedulesController {
  constructor(private createSchedulesCase: CreateSchedulesUseCase) {}

  async handle(req: Request, res: Response) {
    const { auth, body } = req

    try {
      if (!auth.permissions.createSchedule) {
        throw new Error('Usuário sem acesso')
      }

      const request = await this.createSchedulesCase.execute(auth.user, body)

      return res.json(request)
    } catch (err) {
      return res.status(400).json({
        message: err.message || 'Unexpected error'
      })
    }
  }
}
