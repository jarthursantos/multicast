import createHttpError from 'http-errors'

import { ISchedule } from '~/domain/ISchedule'
import { IInvoicesModel } from '~/models/invoices/IInvoicesModel'

export function createMoveInvoicesModule(invoicesModel: IInvoicesModel) {
  return {
    async execute(id: string, schedule: ISchedule) {
      const invoice = await invoicesModel.findById(id)

      if (!invoice) {
        throw new createHttpError.NotFound('Nota Fiscal não existe')
      }

      if (invoice.divergence) {
        throw new createHttpError.NotFound('Nota Fiscal com divergências')
      }

      await invoicesModel.move(id, schedule)

      return invoice
    }
  }
}
