import { Request, Response } from 'express'

import { UpdateScheduleInvoicesUseCase } from './UpdateScheduleInvoicesUseCase'

export class UpdateScheduleInvoicesController {
  constructor(
    private updateScheduleInvoicesCase: UpdateScheduleInvoicesUseCase
  ) {}

  async handle(req: Request, res: Response) {
    const { auth, body, params } = req
    const { id, invoiceId } = params

    try {
      const updatedInvoice = await this.updateScheduleInvoicesCase.execute(
        auth.user,
        id,
        invoiceId,
        body
      )

      return res.json(updatedInvoice)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
