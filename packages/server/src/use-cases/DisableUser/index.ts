import { MongoUserHistoryRepository } from 'repositories/implementations/MongoUserHistoryRepository'
import { PrismaUsersRepository } from 'repositories/implementations/PrismaUsersRepository'

import { DisableUserController } from './DisableUserController'
import { DisableUserUseCase } from './DisableUserUseCase'

const prismaUserRepository = new PrismaUsersRepository()
const mongoUserHistoryRepository = new MongoUserHistoryRepository(
  prismaUserRepository
)

const disableUserUseCase = new DisableUserUseCase(
  prismaUserRepository,
  mongoUserHistoryRepository
)

const disableUserController = new DisableUserController(disableUserUseCase)

export { disableUserUseCase, disableUserController }
