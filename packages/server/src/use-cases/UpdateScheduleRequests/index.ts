import { MongoScheduleRequestHistoryRepository } from 'repositories/implementations/MongoScheduleRequestHistoryRepository'
import { PrismaScheduleRequestsRepository } from 'repositories/implementations/PrismaScheduleRequestsRepository'
import { PrismaUsersRepository } from 'repositories/implementations/PrismaUsersRepository'
import { WinThorProviderRepository } from 'repositories/implementations/WinThorProviderRepository'

import { UpdateScheduleRequestsController } from './UpdateScheduleRequestsController'
import { updateScheduleRequestsSchema } from './UpdateScheduleRequestsSchema'
import { UpdateScheduleRequestsUseCase } from './UpdateScheduleRequestsUseCase'

const winThorProviderRepository = new WinThorProviderRepository()

const prismaScheduleRequestRepository = new PrismaScheduleRequestsRepository(
  winThorProviderRepository
)

const prismaUsersRepository = new PrismaUsersRepository()

const mongoScheduleRequestHistoryRepository = new MongoScheduleRequestHistoryRepository(
  prismaUsersRepository
)

const updateScheduleRequestsUseCase = new UpdateScheduleRequestsUseCase(
  prismaScheduleRequestRepository,
  winThorProviderRepository,
  mongoScheduleRequestHistoryRepository
)

const updateScheduleRequestsController = new UpdateScheduleRequestsController(
  updateScheduleRequestsUseCase
)

export {
  updateScheduleRequestsUseCase,
  updateScheduleRequestsController,
  updateScheduleRequestsSchema
}
