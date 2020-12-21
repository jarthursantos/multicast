import createHttpError from 'http-errors'

import { IInvoicesModel } from '~/models/invoices/IInvoicesModel'

export function createDeleteInvoicesModule(invoicesModel: IInvoicesModel) {
  return {
    async execute(id: string) {
      const invoice = await invoicesModel.findById(id)

      if (!invoice) {
        throw new createHttpError.NotFound('Nota Fiscal não existe')
      }

      await invoicesModel.delete(id)
    }
  }
}
