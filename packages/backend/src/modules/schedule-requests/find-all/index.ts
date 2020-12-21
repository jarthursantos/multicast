import { IScheduleRequestsModel } from '~/models/schedule-requests/IScheduleRequestsModel'

export function createFindAllScheduleRequestsModule(
  scheduleRequestsModel: IScheduleRequestsModel
) {
  return {
    async execute() {
      const requests = scheduleRequestsModel.findMany()

      return requests
    }
  }
}
