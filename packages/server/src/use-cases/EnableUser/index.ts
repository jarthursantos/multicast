import { MongoUserHistoryRepository } from 'repositories/implementations/MongoUserHistoryRepository'
import { PrismaUsersRepository } from 'repositories/implementations/PrismaUsersRepository'

import { EnableUserController } from './EnableUserController'
import { EnableUserUseCase } from './EnableUserUseCase'

const prismaUsersRepository = new PrismaUsersRepository()

const mongoUserHistoryRepository = new MongoUserHistoryRepository(
  prismaUsersRepository
)

const enableUserUseCase = new EnableUserUseCase(
  prismaUsersRepository,
  mongoUserHistoryRepository
)

const enableUserController = new EnableUserController(enableUserUseCase)

export { enableUserUseCase, enableUserController }
