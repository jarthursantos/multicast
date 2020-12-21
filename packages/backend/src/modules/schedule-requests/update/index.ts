import { isBefore, subDays } from 'date-fns'
import createHttpError from 'http-errors'

import { createScheduleRequest } from '~/domain/IScheduleRequest'
import { IUser } from '~/domain/IUser'
import { IProvidersModel } from '~/models/providers/IProvidersModel'
import { IScheduleRequestsModel } from '~/models/schedule-requests/IScheduleRequestsModel'
import { normalizeDate } from '~/utilities/normalizations'

import { IUpdateScheduleRequestsDTO } from './dto'

export function createUpdateScheduleRequestsModule(
  scheduleRequestsModel: IScheduleRequestsModel,
  providersModel: IProvidersModel
) {
  return {
    async execute(
      authUser: IUser,
      requestId: string,
      data: IUpdateScheduleRequestsDTO
    ) {
      const { providerCode } = data
      const requestedDate = normalizeDate(data.requestedDate)

      if (isBefore(requestedDate, subDays(new Date(), 1))) {
        throw new createHttpError.BadRequest('A data solicitada já passou')
      }

      const request = await scheduleRequestsModel.findById(requestId)

      if (!request) {
        throw new createHttpError.BadGateway('Pré Agendamento não existe')
      }

      const provider = await providersModel.findById(providerCode)

      if (!provider) {
        throw new createHttpError.NotFound('Fornecedor não existe')
      }

      const requests = await scheduleRequestsModel.findFromDay(requestedDate)

      const requestsOfProvider = requests.filter(
        req => req.providerCode === providerCode && req.id !== requestId
      )

      if (requestsOfProvider.length !== 0) {
        throw new createHttpError.BadRequest(
          'Fornecedor já efetuou reserva nesta data'
        )
      }

      const updatedRequest = createScheduleRequest(
        { ...data, requestedDate, provider },
        requestId
      )

      await scheduleRequestsModel.update(updatedRequest)
      // TODO: await scheduleRequestHistoryRepository.logUpdate(
      //   authUser,
      //   request,
      //   updatedRequest
      // )

      return updatedRequest
    }
  }
}
