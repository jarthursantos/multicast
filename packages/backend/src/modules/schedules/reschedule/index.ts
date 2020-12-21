import { isBefore, subDays, isSameDay } from 'date-fns'
import createHttpError from 'http-errors'

import { IRescheduleSchedulesModel } from '~/models/reschedule/IRescheduleSchedulesModel'
import { ISchedulesModel } from '~/models/schedules/ISchedulesModel'
import { normalizeDate } from '~/utilities/normalizations'

import { IRescheduleSchedulesDTO } from './dto'

export function createRescheduleSchedulesModule(
  schedulesModel: ISchedulesModel,
  rescheduleSchedulesModel: IRescheduleSchedulesModel
) {
  return {
    async execute(scheduleId: string, data: IRescheduleSchedulesDTO) {
      const schedule = await schedulesModel.findById(scheduleId)

      if (!schedule) {
        throw new createHttpError.NotFound('Agendamento não existe')
      }

      if (schedule.receivedAt) {
        throw new createHttpError.BadRequest('Agendamento foi recebido')
      }

      if (schedule.rescheduledAt) {
        throw new createHttpError.BadRequest('Agendamento já foi reagendado')
      }

      let rescheduleTo: Date

      if (data.scheduledAt instanceof Date) {
        rescheduleTo = data.scheduledAt
      } else {
        rescheduleTo = normalizeDate(data.scheduledAt)
      }

      if (isBefore(rescheduleTo, subDays(new Date(), 1))) {
        throw new createHttpError.BadRequest(
          'Impossível reagendar para uma data que já passou'
        )
      }

      if (isSameDay(schedule.scheduledAt, rescheduleTo)) {
        throw new createHttpError.BadRequest(
          'Impossível reagendar para a mesma data'
        )
      }

      const reschedule = await rescheduleSchedulesModel.reschedule(
        schedule,
        rescheduleTo
      )

      return reschedule
    }
  }
}
