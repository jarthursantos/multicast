import { Request, Response } from 'express'

import { CreateScheduleInvoicesUseCase } from './CreateScheduleInvoicesUseCase'

export class CreateScheduleInvoicesController {
  constructor(
    private createScheduleInvoicesCase: CreateScheduleInvoicesUseCase
  ) {}

  async handle(req: Request, res: Response) {
    const { auth, body, params } = req
    const { id } = params

    try {
      if (!auth.permissions.manageInvoicesInSchedule) {
        throw new Error('Usuário sem acesso')
      }

      const invoice = await this.createScheduleInvoicesCase.execute(
        auth.user,
        id,
        body
      )

      return res.json(invoice)
    } catch (err) {
      return res.status(400).json({
        message: err.message || 'Unexpected error'
      })
    }
  }
}
