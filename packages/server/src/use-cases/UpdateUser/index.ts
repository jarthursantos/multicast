import { MongoUserHistoryRepository } from 'repositories/implementations/MongoUserHistoryRepository'
import { PrismaUsersRepository } from 'repositories/implementations/PrismaUsersRepository'

import { UpdateUserController } from './UpdateUserController'
import { updateUserSchema } from './UpdateUserSchema'
import { UpdateUserUseCase } from './UpdateUserUseCase'

const prismaUsersRepository = new PrismaUsersRepository()

const mongoUserHistoryRepository = new MongoUserHistoryRepository(
  prismaUsersRepository
)

const updateUserUseCase = new UpdateUserUseCase(
  prismaUsersRepository,
  mongoUserHistoryRepository
)

const updateUserController = new UpdateUserController(updateUserUseCase)

export { updateUserUseCase, updateUserController, updateUserSchema }
