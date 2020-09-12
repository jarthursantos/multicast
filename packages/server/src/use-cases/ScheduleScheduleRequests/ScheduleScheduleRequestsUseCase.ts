import { User } from 'entities/User'
import { IProviderRepository } from 'repositories/IProviderRepository'
import { IScheduleRequestsRepository } from 'repositories/IScheduleRequestsRepository'
import { createSchedulesUseCase } from 'use-cases/CreateSchedules'

import { ScheduleScheduleRequestsRequestDTO } from './ScheduleScheduleRequestsDTO'

export class ScheduleScheduleRequestsUseCase {
  constructor(
    private scheduleRequestsRepository: IScheduleRequestsRepository,
    private providersRepository: IProviderRepository
  ) {}

  async execute(
    authUser: User,
    requestId: string,
    data: ScheduleScheduleRequestsRequestDTO
  ) {
    const { providerCode, requestedDate: scheduledAt } = data

    const request = await this.scheduleRequestsRepository.findById(requestId)

    if (!request) {
      throw new Error('Pré Agendamento não existe')
    }

    const provider = await this.providersRepository.findById(providerCode)

    if (!provider) {
      throw Error('Fornecedor não existe')
    }

    const schedule = await createSchedulesUseCase.execute(authUser, {
      ...data,
      scheduledAt,
      shippingName: provider.name
    })

    await this.scheduleRequestsRepository.attachToSchedule(
      requestId,
      schedule.id
    )

    return schedule
  }
}
