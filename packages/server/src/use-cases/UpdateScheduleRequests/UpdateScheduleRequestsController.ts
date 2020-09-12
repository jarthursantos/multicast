import { Request, Response } from 'express'

import { UpdateScheduleRequestsUseCase } from './UpdateScheduleRequestsUseCase'

export class UpdateScheduleRequestsController {
  constructor(
    private updateScheduleRequestsCase: UpdateScheduleRequestsUseCase
  ) {}

  async handle(req: Request, res: Response) {
    const { params, body, auth } = req
    const { id } = params

    try {
      if (!auth.permissions.createRequest) {
        throw new Error('Usuário sem acesso')
      }

      const request = await this.updateScheduleRequestsCase.execute(
        auth.user,
        id,
        body
      )

      return res.json(request)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
