import createHttpError from 'http-errors'

import { IInvoicesModel } from '~/models/invoices/IInvoicesModel'

export function createCancelInvoicesModule(invoicesModel: IInvoicesModel) {
  return {
    async execute(id: string) {
      const invoice = await invoicesModel.findById(id)

      if (!invoice) {
        throw new createHttpError.NotFound('Nota fiscal não encontrada')
      }

      if (invoice.canceledAt) {
        throw new createHttpError.BadRequest('Nota fiscal já cancelada')
      }

      await invoicesModel.cancel(id)

      const canceledInvoice = await invoicesModel.findById(id)

      return canceledInvoice
    }
  }
}
