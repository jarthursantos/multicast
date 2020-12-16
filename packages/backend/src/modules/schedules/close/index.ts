import createHttpError from 'http-errors'

import { ISchedulesModel } from '~/models/schedules/ISchedulesModel'

export function createCloseSchedulesModule(schedulesModel: ISchedulesModel) {
  return {
    async execute(scheduleId: string) {
      const schedule = await schedulesModel.findById(scheduleId)

      if (!schedule) {
        throw new createHttpError.NotFound('Agendamento não existe')
      }

      if (schedule.closedAt) {
        throw new createHttpError.BadRequest('Agendamento já fechado')
      }

      if (schedule.receivedAt) {
        throw new createHttpError.BadRequest('Esse agendamento já foi recebido')
      }

      if (!schedule.invoices || schedule.invoices.length === 0) {
        throw new createHttpError.BadRequest(
          'Esse agendamento não possui notas'
        )
      }

      const invoiceWithPendingData = schedule.invoices.find(invoice => {
        const { number, value, volume, weight, key, emittedAt } = invoice

        if (!number || !value || !volume || !weight || !key || !emittedAt) {
          return true
        }

        return false
      })

      if (invoiceWithPendingData) {
        throw new createHttpError.BadRequest(
          'Esse agendamento possui notas com informações pendentes'
        )
      }

      const closedSchedule = await schedulesModel.close(schedule)

      return closedSchedule
    }
  }
}
