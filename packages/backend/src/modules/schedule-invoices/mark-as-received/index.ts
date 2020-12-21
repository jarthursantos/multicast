import createHttpError from 'http-errors'

import { IInvoicesModel } from '~/models/invoices/IInvoicesModel'
import { ISchedulesModel } from '~/models/schedules/ISchedulesModel'

export function createMarkScheduleInvoiceAsReceived(
  schedulesModel: ISchedulesModel,
  invoicesModel: IInvoicesModel
) {
  return {
    async execute(scheduleId: string, invoiceId: string) {
      const schedule = await schedulesModel.findById(scheduleId)

      if (!schedule) {
        throw new createHttpError.NotFound('Agendamento não existe')
      }

      if (!schedule.closedAt) {
        throw new createHttpError.BadRequest('Agendamento não foi fechado')
      }

      if (schedule.receivedAt) {
        throw new createHttpError.BadRequest(
          'Agendamento já teve os recibos confirmados'
        )
      }

      const invoice = await invoicesModel.findById(invoiceId)

      if (!invoice) {
        throw new createHttpError.NotFound('Nota Fiscal não existe')
      }

      if (invoice.divergence === 'ADDED') {
        throw new createHttpError.BadRequest(
          'Nota Fiscal já possui uma divergência'
        )
      }

      if (schedule.canceledAt) {
        throw new createHttpError.BadRequest('Esse agendamento foi cancelado')
      }

      if (!schedule.closedAt) {
        throw new createHttpError.BadRequest(
          'Esse agendamento ainda não foi fechado'
        )
      }

      invoice.divergence = 'RECEIVED'

      await invoicesModel.update(invoice)

      return invoice
    }
  }
}
