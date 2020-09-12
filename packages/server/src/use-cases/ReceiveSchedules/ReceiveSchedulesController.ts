import { Request, Response } from 'express'

import { ReceiveSchedulesUseCase } from './ReceiveSchedulesUseCase'

export class ReceiveSchedulesController {
  constructor(private receiveSchedulesCase: ReceiveSchedulesUseCase) {}

  async handle(req: Request, res: Response) {
    const { auth, params } = req
    const { id } = params

    try {
      if (!auth.permissions.receiveSchedule) {
        throw new Error('Usuário sem acesso')
      }

      const receivedSchedule = await this.receiveSchedulesCase.execute(
        id,
        req.body
      )

      return res.json(receivedSchedule)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
