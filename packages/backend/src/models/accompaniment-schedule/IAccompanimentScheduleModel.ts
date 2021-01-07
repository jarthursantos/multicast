import { IAccompaniment } from '~/domain/IAccompaniment'
import { ISchedule } from '~/domain/ISchedule'

export interface IAccompanimentScheduleModel {
  find(accompaniment: IAccompaniment): Promise<ISchedule | undefined>
}
