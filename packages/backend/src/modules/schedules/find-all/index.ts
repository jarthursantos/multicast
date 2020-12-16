import { ISchedulesModel } from '~/models/schedules/ISchedulesModel'

import { IFindAllSchedulesDTO } from './dto'

export function createFindAllSchedulesModule(schedulesModel: ISchedulesModel) {
  return {
    async execute(options?: IFindAllSchedulesDTO) {
      const schedules = await schedulesModel.findMany(options)

      return schedules
    }
  }
}
