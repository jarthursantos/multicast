import { parseISO, isBefore, subDays } from 'date-fns'
import { ScheduleRequest } from 'entities/ScheduleRequest'
import { User } from 'entities/User'
import { IProviderRepository } from 'repositories/IProviderRepository'
import { IScheduleRequestHistoryRepository } from 'repositories/IScheduleRequestHistoryRepository'
import { IScheduleRequestsRepository } from 'repositories/IScheduleRequestsRepository'

import { UpdateScheduleRequestsRequestDTO } from './UpdateScheduleRequestsDTO'

export class UpdateScheduleRequestsUseCase {
  constructor(
    private scheduleRequestsRepository: IScheduleRequestsRepository,
    private providerRepository: IProviderRepository,
    private scheduleRequestHistoryRepository: IScheduleRequestHistoryRepository
  ) {}

  async execute(
    authUser: User,
    requestId: string,
    data: UpdateScheduleRequestsRequestDTO
  ) {
    const { providerCode } = data
    const requestedDate = parseISO(data.requestedDate)

    if (isBefore(requestedDate, subDays(new Date(), 1))) {
      throw Error('A data solicitada já passou')
    }

    const request = await this.scheduleRequestsRepository.findById(requestId)

    if (!request) {
      throw new Error('Pré Agendamento não existe')
    }

    const provider = await this.providerRepository.findById(providerCode)

    if (!provider) {
      throw Error('Fornecedor não existe')
    }

    const requests = await this.scheduleRequestsRepository.findFromDay(
      requestedDate
    )

    const requestsOfProvider = requests.filter(
      req => req.providerCode === providerCode && req.id !== requestId
    )

    if (requestsOfProvider.length !== 0) {
      throw Error('Fornecedor já efetuou reserva nesta data')
    }

    const updatedRequest = new ScheduleRequest(
      { ...data, requestedDate, provider },
      requestId
    )

    await this.scheduleRequestsRepository.update(updatedRequest)
    await this.scheduleRequestHistoryRepository.logUpdate(
      authUser,
      request,
      updatedRequest
    )

    return updatedRequest
  }
}
