import createHttpError from 'http-errors'

import { ISchedulesModel } from '~/models/schedules/ISchedulesModel'
import { IScheduleReceiptProvider } from '~/providers/schedule-receipt/IScheduleReceiptProvider'

export function createScheduleReceiptModule(
  schedulesModel: ISchedulesModel,
  scheduleReceiptProvider: IScheduleReceiptProvider
) {
  return {
    async execute(scheduleId: string) {
      const schedule = await schedulesModel.findById(scheduleId)

      if (!schedule) {
        throw new createHttpError.NotFound('Agendamento não existe')
      }

      if (!schedule.receivedAt) {
        throw new createHttpError.BadRequest('Agendamento não foi recebido')
      }

      const reportFile = await scheduleReceiptProvider.generate({
        ...schedule,
        invoices: schedule.invoices.map(invoice => ({
          ...invoice,
          name: invoice.provider.name
        }))
      })

      return reportFile
    }
  }
}
