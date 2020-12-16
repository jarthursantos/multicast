import createHttpError from 'http-errors'

import { ISchedulesModel } from '~/models/schedules/ISchedulesModel'
import { deleteInvoicesModule } from '~/modules/invoices'

export function createDeleteScheduleInvoicesModule(
  schedulesModel: ISchedulesModel
) {
  return {
    async execute(scheduleId: string, invoiceId: string) {
      const schedule = await schedulesModel.findById(scheduleId)

      if (!schedule) {
        throw new createHttpError.NotFound('Agendamento não existe')
      }

      if (schedule.closedAt) {
        throw new createHttpError.BadRequest('Esse agendamento foi fechado')
      }

      await deleteInvoicesModule.execute(invoiceId)
    }
  }
}
