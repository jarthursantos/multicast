import { parseISO, isBefore, subDays } from 'date-fns'
import { ScheduleRequest } from 'entities/ScheduleRequest'
import { User } from 'entities/User'
import { IProviderRepository } from 'repositories/IProviderRepository'
import { IScheduleRequestHistoryRepository } from 'repositories/IScheduleRequestHistoryRepository'
import { IScheduleRequestsRepository } from 'repositories/IScheduleRequestsRepository'

import { CreateScheduleRequestsRequestDTO } from './CreateScheduleRequestsDTO'

export class CreateSchedulesRequestUseCase {
  constructor(
    private scheduleRequestRepository: IScheduleRequestsRepository,
    private providerRepository: IProviderRepository,
    private scheduleRequestHistoryRepository: IScheduleRequestHistoryRepository
  ) {}

  async execute(authUser: User, data: CreateScheduleRequestsRequestDTO) {
    const { providerCode } = data
    const requestedDate = parseISO(data.requestedDate)

    if (isBefore(requestedDate, subDays(new Date(), 1))) {
      throw Error('A data solicitada já passou')
    }

    const provider = await this.providerRepository.findById(providerCode)

    if (!provider) {
      throw Error('Fornecedor não existe')
    }

    const requests = await this.scheduleRequestRepository.findFromDay(
      requestedDate
    )

    const requestsOfProvider = requests.filter(
      req => req.providerCode === providerCode
    )

    if (requestsOfProvider.length !== 0) {
      throw Error('Fornecedor já efetuou reserva nesta data')
    }

    const request = new ScheduleRequest({
      requestedDate,
      providerCode,
      provider
    })

    await this.scheduleRequestRepository.save(request)
    await this.scheduleRequestHistoryRepository.logStore(authUser, request)

    return request
  }
}
