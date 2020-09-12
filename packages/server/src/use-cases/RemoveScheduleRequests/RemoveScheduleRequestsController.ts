import { Request, Response } from 'express'

import { RemoveScheduleRequestsUseCase } from './RemoveScheduleRequestsUseCase'

export class RemoveScheduleRequestsController {
  constructor(
    private removeSchedulesRequestCase: RemoveScheduleRequestsUseCase
  ) {}

  async handle(req: Request, res: Response) {
    const { auth, params } = req
    const { id } = params

    try {
      if (!auth.permissions.createRequest) {
        throw new Error('Usuário sem acesso')
      }

      await this.removeSchedulesRequestCase.execute(id)

      return res.status(200).send()
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
