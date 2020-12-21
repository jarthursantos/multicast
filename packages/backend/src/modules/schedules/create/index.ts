import { isBefore, subDays } from 'date-fns'

import { createSchedule } from '~/domain/ISchedule'
import { IUser } from '~/domain/IUser'
import { ScheduleSituations } from '~/domain/ScheduleSituations'
import { IDisachargeTablesModel } from '~/models/dischage-tables/IDisachargeTablesModel'
import { ISchedulesModel } from '~/models/schedules/ISchedulesModel'
import { normalizeDate } from '~/utilities/normalizations'

import { ICreateSchedulesDTO } from './dto'

export function createCreateSchedulesModule(
  schedulesModel: ISchedulesModel,
  dischargeTablesModel: IDisachargeTablesModel
) {
  return {
    async execute(authUser: IUser, data: ICreateSchedulesDTO) {
      const scheduledAt = normalizeDate(data.scheduledAt)

      if (isBefore(scheduledAt, subDays(new Date(), 1))) {
        throw Error('Impossível agendar para uma data que já passou')
      }

      const dischargeTable = await dischargeTablesModel.findLatest()

      if (!dischargeTable) {
        throw Error('Nenhuma tabela de descarrego cadastrada')
      }

      const schedule = createSchedule({
        ...data,
        dischargeTable,
        scheduledAt,
        invoices: [],
        totalVolume: 0,
        totalWeight: 0,
        situation: ScheduleSituations.OPENED
      })

      await schedulesModel.save(schedule)
      // TODO: await scheduleHistoryModel.logStore(authUser, schedule)

      return schedule
    }
  }
}
