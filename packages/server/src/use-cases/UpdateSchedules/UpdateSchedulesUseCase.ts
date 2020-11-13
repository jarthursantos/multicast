import { isBefore, subDays } from 'date-fns'
import { Schedule } from 'entities/Schedule'
import { User } from 'entities/User'
import { assign } from 'lodash'
import { IScheduleHistoryRepository } from 'repositories/IScheduleHistoryRepository'
import { ISchedulesRepository } from 'repositories/ISchedulesRepository'

import { IUpdateSchedulesRequestDTO } from './UpdateSchedulesDTO'

export class UpdateSchedulesUseCase {
  constructor(
    private schedulesRespository: ISchedulesRepository,
    private schedulesHistoryRepository: IScheduleHistoryRepository
  ) {}

  async execute(authUser: User, id: string, data: IUpdateSchedulesRequestDTO) {
    const schedule = await this.schedulesRespository.findById(id)

    if (!schedule) {
      throw Error('Agendamento não existe')
    }

    if (schedule.canceledAt) {
      throw Error('Esse agendamento foi cancelado')
    }

    if (schedule.closedAt) {
      throw Error('Esse agendamento foi fechado')
    }

    const updateData = assign(new Schedule(schedule, schedule.id), data)

    if (isBefore(updateData.scheduledAt, subDays(new Date(), 1))) {
      throw Error('A data solicitada já passou')
    }

    const updatedSchedule = await this.schedulesRespository.update(updateData)
    await this.schedulesHistoryRepository.logUpdate(
      authUser,
      schedule,
      updatedSchedule
    )

    return updatedSchedule
  }
}
