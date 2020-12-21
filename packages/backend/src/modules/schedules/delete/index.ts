import createHttpError from 'http-errors'

import { IInvoicesModel } from '~/models/invoices/IInvoicesModel'
import { IScheduleInvoicesModel } from '~/models/schedule-invoices/IScheduleInvoicesModel'
import { ISchedulesModel } from '~/models/schedules/ISchedulesModel'

export function createDeleteSchedulesModule(
  schedulesModel: ISchedulesModel,
  invoicesModel: IInvoicesModel,
  scheduleInvoicesModel: IScheduleInvoicesModel
) {
  return {
    async execute(id: string) {
      const schedule = await schedulesModel.findById(id)

      if (!schedule) {
        throw new createHttpError.NotFound('Agendamento não existe')
      }

      if (schedule.closedAt) {
        throw new createHttpError.BadRequest('Esse agendamento já foi fechado')
      }

      const invoices = await scheduleInvoicesModel.findInvoicesOfSchedule(id)

      for (let i = 0; i < invoices.length; i++) {
        const invoice = invoices[i]

        await invoicesModel.delete(invoice.id)
      }

      await schedulesModel.delete(id)
    }
  }
}
