import { MongoUserHistoryRepository } from 'repositories/implementations/MongoUserHistoryRepository'
import { PrismaUsersRepository } from 'repositories/implementations/PrismaUsersRepository'

import { FindUserChangesController } from './FindUserChangesController'
import { FindUserChangesUseCase } from './FindUserChangesUseCase'

const prismaUsersRepository = new PrismaUsersRepository()

const mongoUserHistoryRepository = new MongoUserHistoryRepository(
  prismaUsersRepository
)

const findUserChangesUseCase = new FindUserChangesUseCase(
  prismaUsersRepository,
  mongoUserHistoryRepository
)

const findUserChangesController = new FindUserChangesController(
  findUserChangesUseCase
)

export { findUserChangesUseCase, findUserChangesController }
