import { Request, Response } from 'express'

import { UpdateInvoicesUseCase } from './UpdateInvoicesUseCase'

export class UpdateInvoicesController {
  constructor(private updateInvoicesCase: UpdateInvoicesUseCase) {}

  async handle(req: Request, res: Response) {
    const { auth, body, params } = req
    const { id } = params

    try {
      if (!auth.permissions.manageInvoicesInSchedule) {
        throw new Error('Usuário sem acesso')
      }

      const invoice = await this.updateInvoicesCase.execute(auth.user, id, body)

      return res.json(invoice)
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error'
      })
    }
  }
}
