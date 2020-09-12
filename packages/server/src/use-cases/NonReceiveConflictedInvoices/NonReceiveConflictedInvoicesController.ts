import { Request, Response } from 'express'

import { NonReceiveConflictedInvoicesUseCase } from './NonReceiveConflictedInvoicesUseCase'

export class NonReceiveConflictedInvoicesController {
  constructor(
    private nonReceiveConflictedInvoicesCase: NonReceiveConflictedInvoicesUseCase
  ) {}

  async handle(req: Request, res: Response) {
    const { auth, params } = req
    const { id, invoiceId } = params

    try {
      if (!auth.permissions.receiveSchedule) {
        throw new Error('Usuário sem acesso')
      }

      const invoice = await this.nonReceiveConflictedInvoicesCase.execute(
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
