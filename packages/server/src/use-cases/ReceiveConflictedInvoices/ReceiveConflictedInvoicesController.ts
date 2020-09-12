import { Request, Response } from 'express'

import { ReceiveConflictedInvoicesUseCase } from './ReceiveConflictedInvoicesUseCase'

export class ReceiveConflictedInvoicesController {
  constructor(
    private receiveConflictedInvoicesCase: ReceiveConflictedInvoicesUseCase
  ) {}

  async handle(req: Request, res: Response) {
    const { auth, params } = req
    const { id, invoiceId } = params

    try {
      if (!auth.permissions.receiveSchedule) {
        throw new Error('Usuário sem acesso')
      }

      const invoice = await this.receiveConflictedInvoicesCase.execute(
        id,
        invoiceId
      )

      return res.json(invoice)
    } catch (err) {
      return res.status(400).json({
        message: err.message || 'Unexpected error'
      })
    }
  }
}
