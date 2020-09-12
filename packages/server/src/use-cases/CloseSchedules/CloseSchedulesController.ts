import { Request, Response } from 'express'

import { CloseSchedulesUseCase } from './CloseSchedulesUseCase'

export class CloseSchedulesController {
  constructor(private closeSchedulesCase: CloseSchedulesUseCase) {}

  async handle(req: Request, res: Response) {
    const { auth, params } = req
    const { id } = params

    try {
      if (!auth.permissions.closeSchedule) {
        throw new Error('Usuário sem acesso')
      }

      const schedule = await this.closeSchedulesCase.execute(id)

      return res.json(schedule)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
