import { isEqual, parseISO, isBefore, subDays } from 'date-fns'
import { IRescheduleSchedulesRepository } from 'repositories/IRescheduleSchedulesRepository'
import { ISchedulesRepository } from 'repositories/ISchedulesRepository'

import { RescheduleSchedulesRequestDTO } from './RescheduleSchedulesDTO'

export class RescheduleSchedulesUseCase {
  constructor(
    private schedulesRepository: ISchedulesRepository,
    private rescheduleSchedulesRepository: IRescheduleSchedulesRepository
  ) {}

  async execute(scheduleId: string, data: RescheduleSchedulesRequestDTO) {
    const schedule = await this.schedulesRepository.findById(scheduleId)

    if (!schedule) {
      throw new Error('Agendamento não existe')
    }

    if (schedule.receivedAt) {
      throw new Error('Agendamento foi recebido')
    }

    if (schedule.rescheduledAt) {
      throw new Error('Agendamento já foi reagendado')
    }

    let rescheduleTo: Date

    if (data.scheduledAt instanceof Date) {
      rescheduleTo = data.scheduledAt
    } else {
      rescheduleTo = parseISO(data.scheduledAt)
    }

    if (isBefore(rescheduleTo, subDays(new Date(), 1))) {
      throw Error('Impossível reagendar para uma data que já passou')
    }

    if (isEqual(schedule.scheduledAt, rescheduleTo)) {
      throw new Error('Impossível reagendar para a mesma data')
    }

    const reschedule = await this.rescheduleSchedulesRepository.reschedule(
      schedule,
      rescheduleTo
    )

    return reschedule
  }
}
