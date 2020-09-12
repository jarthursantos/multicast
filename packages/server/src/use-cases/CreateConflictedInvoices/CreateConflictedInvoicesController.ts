import { Request, Response } from 'express'

import { CreateConflictedInvoicesUseCase } from './CreateConflictedInvoicesUseCase'

export class CreateConflictedInvoicesController {
  constructor(
    private createConflictedInvoicesCase: CreateConflictedInvoicesUseCase
  ) {}

  async handle(req: Request, res: Response) {
    const { auth, body, params } = req
    const { id } = params

    try {
      if (!auth.permissions.addExtraScheduledInvoices) {
        throw new Error('Usuário sem acesso')
      }

      const invoice = await this.createConflictedInvoicesCase.execute(
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
