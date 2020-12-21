import createHttpError from 'http-errors'

import { IInvoicesModel } from '~/models/invoices/IInvoicesModel'
import { ISchedulesModel } from '~/models/schedules/ISchedulesModel'
import { IScheduleInvoiceReceiptProvider } from '~/providers/schedule-invoice-receipt/IScheduleInvoiceReceiptProvider'

export function createScheduleInvoiceReceiptModule(
  schedulesModel: ISchedulesModel,
  invoicesModel: IInvoicesModel,
  scheduleInvoiceReceiptProvider: IScheduleInvoiceReceiptProvider
) {
  return {
    async execute(scheduleId: string, invoiceId: string) {
      const schedule = await schedulesModel.findById(scheduleId)

      if (!schedule) {
        throw new createHttpError.NotFound('Agendamento não existe')
      }

      if (!schedule.receivedAt) {
        throw new createHttpError.BadRequest('Agendamento não foi recebido')
      }

      const invoice = await invoicesModel.findById(invoiceId)

      if (!invoice) {
        throw new createHttpError.NotFound('Nota Fiscal não existe')
      }

      const reportFile = await scheduleInvoiceReceiptProvider.generate({
        shippingName: schedule.shippingName,
        ...invoice,
        name: invoice.provider.name
      })

      return reportFile
    }
  }
}
