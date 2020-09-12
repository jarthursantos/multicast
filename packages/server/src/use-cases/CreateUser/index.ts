import { MongoUserHistoryRepository } from 'repositories/implementations/MongoUserHistoryRepository'
import { PrismaUsersRepository } from 'repositories/implementations/PrismaUsersRepository'

import { CreateUserController } from './CreateUserController'
import { createUserSchema } from './CreateUserSchema'
import { CreateUserUseCase } from './CreateUserUseCase'

const prismaUsersRepository = new PrismaUsersRepository()

const mongoUserHistoryRepository = new MongoUserHistoryRepository(
  prismaUsersRepository
)

const createUserUseCase = new CreateUserUseCase(
  prismaUsersRepository,
  mongoUserHistoryRepository
)

const createUserController = new CreateUserController(createUserUseCase)

export { createUserUseCase, createUserController, createUserSchema }
