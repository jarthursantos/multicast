import { isBefore, subDays } from 'date-fns'
import createHttpError from 'http-errors'

import { createScheduleRequest } from '~/domain/IScheduleRequest'
import { IUser } from '~/domain/IUser'
import { IProvidersModel } from '~/models/providers/IProvidersModel'
import { IScheduleRequestsModel } from '~/models/schedule-requests/IScheduleRequestsModel'
import { normalizeDate } from '~/utilities/normalizations'

import { ICreateScheduleRequestsDTO } from './dto'

export function createCreateScheduleRequestModule(
  scheduleRequestsModel: IScheduleRequestsModel,
  providersModel: IProvidersModel
) {
  return {
    async execute(authUser: IUser, data: ICreateScheduleRequestsDTO) {
      const { providerCode } = data
      const requestedDate = normalizeDate(data.requestedDate)

      if (isBefore(requestedDate, subDays(new Date(), 1))) {
        throw new createHttpError.BadRequest('A data solicitada já passou')
      }

      const provider = await providersModel.findById(providerCode)

      if (!provider) {
        throw new createHttpError.NotFound('Fornecedor não existe')
      }

      const requests = await scheduleRequestsModel.findFromDay(requestedDate)

      const requestsOfProvider = requests.filter(
        req => req.providerCode === providerCode
      )

      if (requestsOfProvider.length !== 0) {
        throw new createHttpError.BadRequest(
          'Fornecedor já efetuou reserva nesta data'
        )
      }

      const request = createScheduleRequest({
        requestedDate,
        providerCode,
        provider
      })

      await scheduleRequestsModel.save(request)
      // TODO: await scheduleRequestHistoryRepository.logStore(authUser, request)

      return request
    }
  }
}
