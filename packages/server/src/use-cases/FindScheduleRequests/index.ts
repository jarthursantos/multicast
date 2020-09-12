import { PrismaScheduleRequestsRepository } from 'repositories/implementations/PrismaScheduleRequestsRepository'
import { WinThorProviderRepository } from 'repositories/implementations/WinThorProviderRepository'

import { FindScheduleRequestsController } from './FindScheduleRequestsController'
import { FindScheduleRequestsUseCase } from './FindScheduleRequestsUseCase'

const winThorProviderRepository = new WinThorProviderRepository()

const prismaScheduleRequestRepository = new PrismaScheduleRequestsRepository(
  winThorProviderRepository
)

const findScheduleRequestsUseCase = new FindScheduleRequestsUseCase(
  prismaScheduleRequestRepository
)

const findScheduleRequestsController = new FindScheduleRequestsController(
  findScheduleRequestsUseCase
)

export { findScheduleRequestsUseCase, findScheduleRequestsController }
