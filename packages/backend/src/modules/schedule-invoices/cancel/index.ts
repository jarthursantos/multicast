import createHttpError from 'http-errors'

import { ISchedulesModel } from '~/models/schedules/ISchedulesModel'
import { cancelInvoicesModule } from '~/modules/invoices'

export function createCancelScheduleInvoicesModule(
  schedulesModel: ISchedulesModel
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
        throw new createHttpError.BadRequest('Esse agendamento foi recebido')
      }

      const canceledInvoice = await cancelInvoicesModule.execute(invoiceId)

      return canceledInvoice
    }
  }
}
