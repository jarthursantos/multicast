import { PrismaScheduleRequestsRepository } from 'repositories/implementations/PrismaScheduleRequestsRepository'
import { WinThorProviderRepository } from 'repositories/implementations/WinThorProviderRepository'

import { ScheduleScheduleRequestsController } from './ScheduleScheduleRequestsController'
import { scheduleScheduleRequestsSchema } from './ScheduleScheduleRequestsSchema'
import { ScheduleScheduleRequestsUseCase } from './ScheduleScheduleRequestsUseCase'

const winThorProviderRepository = new WinThorProviderRepository()

const prismaScheduleRequestRepository = new PrismaScheduleRequestsRepository(
  winThorProviderRepository
)

const scheduleScheduleRequestsUseCase = new ScheduleScheduleRequestsUseCase(
  prismaScheduleRequestRepository,
  winThorProviderRepository
)

const scheduleScheduleRequestsController = new ScheduleScheduleRequestsController(
  scheduleScheduleRequestsUseCase
)

export {
  scheduleScheduleRequestsUseCase,
  scheduleScheduleRequestsSchema,
  scheduleScheduleRequestsController
}
