import { PrismaScheduleRequestsRepository } from 'repositories/implementations/PrismaScheduleRequestsRepository'
import { WinThorProviderRepository } from 'repositories/implementations/WinThorProviderRepository'

import { RemoveScheduleRequestsController } from './RemoveScheduleRequestsController'
import { RemoveScheduleRequestsUseCase } from './RemoveScheduleRequestsUseCase'

const winThorProviderRepository = new WinThorProviderRepository()

const prismaScheduleRequestRepository = new PrismaScheduleRequestsRepository(
  winThorProviderRepository
)

const removeScheduleRequestsUseCase = new RemoveScheduleRequestsUseCase(
  prismaScheduleRequestRepository
)

const removeScheduleRequestsController = new RemoveScheduleRequestsController(
  removeScheduleRequestsUseCase
)

export { removeScheduleRequestsUseCase, removeScheduleRequestsController }
