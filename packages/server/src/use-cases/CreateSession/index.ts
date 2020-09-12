import { PrismaUsersRepository } from 'repositories/implementations/PrismaUsersRepository'

import { CreateSessionController } from './CreateSessionController'
import { createSessionSchema } from './CreateSessionSchema'
import { CreateSessionUseCase } from './CreateSessionUseCase'

const prismaUsersRepository = new PrismaUsersRepository()

const createSessionUseCase = new CreateSessionUseCase(prismaUsersRepository)

const createSessionController = new CreateSessionController(
  createSessionUseCase
)

export { createSessionUseCase, createSessionController, createSessionSchema }
