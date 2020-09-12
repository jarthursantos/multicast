import { parseISO, isBefore, subDays } from 'date-fns'
import { Schedule } from 'entities/Schedule'
import { ScheduleSituations } from 'entities/ScheduleSituations'
import { User } from 'entities/User'
import { IDischargeTablesRepository } from 'repositories/IDischargeTablesRepository'
import { IScheduleHistoryRepository } from 'repositories/IScheduleHistoryRepository'
import { ISchedulesRepository } from 'repositories/ISchedulesRepository'

import { CreateSchedulesRequestDTO } from './CreateSchedulesDTO'

export class CreateSchedulesUseCase {
  constructor(
    private scheduleRepository: ISchedulesRepository,
    private dischargeTableRepository: IDischargeTablesRepository,
    private scheduleHistoryRepository: IScheduleHistoryRepository
  ) {}

  async execute(authUser: User, data: CreateSchedulesRequestDTO) {
    const scheduledAt = parseISO(data.scheduledAt)

    if (isBefore(scheduledAt, subDays(new Date(), 1))) {
      throw Error('Impossível agendar para uma data que já passou')
    }

    const dischargeTable = await this.dischargeTableRepository.findLatest()

    if (!dischargeTable) {
      throw Error('Nenhuma tabela de descarrego cadastrada')
    }

    const schedule = new Schedule({
      ...data,
      dischargeTable,
      scheduledAt,
      invoices: [],
      totalVolume: 0,
      totalWeight: 0,
      situation: ScheduleSituations.OPENED
    })

    await this.scheduleRepository.save(schedule)
    await this.scheduleHistoryRepository.logStore(authUser, schedule)

    return schedule
  }
}
