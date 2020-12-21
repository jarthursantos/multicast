import createHttpError from 'http-errors'

import { IScheduleRequestsModel } from '~/models/schedule-requests/IScheduleRequestsModel'

export function createRemoveScheduleRequestsModule(
  scheduleRequestsModel: IScheduleRequestsModel
) {
  return {
    async execute(requestId: string) {
      const request = await scheduleRequestsModel.findById(requestId)

      if (!request) {
        throw new createHttpError.NotFound('Pré Agendamento não existe')
      }

      await scheduleRequestsModel.remove(requestId)
    }
  }
}
