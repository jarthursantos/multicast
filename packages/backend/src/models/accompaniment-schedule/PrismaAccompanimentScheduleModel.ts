import { IAccompaniment } from '~/domain/IAccompaniment'
import { ISchedule } from '~/domain/ISchedule'

import { IAccompanimentScheduleModel } from './IAccompanimentScheduleModel'

export function createPrismaAccompanimentScheduleModel(): IAccompanimentScheduleModel {
  return {
    async find(accompaniment: IAccompaniment): Promise<ISchedule | undefined> {
      if (!accompaniment.invoice) return undefined

      return undefined
    }
  }
}
