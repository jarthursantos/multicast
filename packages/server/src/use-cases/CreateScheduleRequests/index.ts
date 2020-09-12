import { MongoScheduleRequestHistoryRepository } from 'repositories/implementations/MongoScheduleRequestHistoryRepository'
import { PrismaScheduleRequestsRepository } from 'repositories/implementations/PrismaScheduleRequestsRepository'
import { PrismaUsersRepository } from 'repositories/implementations/PrismaUsersRepository'
import { WinThorProviderRepository } from 'repositories/implementations/WinThorProviderRepository'

import { CreateScheduleRequestsController } from './CreateScheduleRequestsController'
import { createScheduleRequestsSchema } from './CreateScheduleRequestsSchema'
import { CreateSchedulesRequestUseCase } from './CreateScheduleRequestsUseCase'

const winThorProviderRepository = new WinThorProviderRepository()

const prismaScheduleRequestRepository = new PrismaScheduleRequestsRepository(
  winThorProviderRepository
)

const prismaUsersRepository = new PrismaUsersRepository()

const mongoScheduleRequestHistoryRepository = new MongoScheduleRequestHistoryRepository(
  prismaUsersRepository
)

const createScheduleRequestUseCase = new CreateSchedulesRequestUseCase(
  prismaScheduleRequestRepository,
  winThorProviderRepository,
  mongoScheduleRequestHistoryRepository
)

const createScheduleRequestController = new CreateScheduleRequestsController(
  createScheduleRequestUseCase
)

export {
  createScheduleRequestUseCase,
  createScheduleRequestController,
  createScheduleRequestsSchema
}
