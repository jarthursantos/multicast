import { PrismaUsersRepository } from 'repositories/implementations/PrismaUsersRepository'

import { FindUserByIdController } from './FindUserByIdController'
import { FindUserByIdUseCase } from './FindUserByIdUseCase'

const prismaUsersRepository = new PrismaUsersRepository()

const findUserByIdUseCase = new FindUserByIdUseCase(prismaUsersRepository)

const findUserByIdController = new FindUserByIdController(findUserByIdUseCase)

export { findUserByIdUseCase, findUserByIdController }
