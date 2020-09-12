import { PrismaUsersRepository } from 'repositories/implementations/PrismaUsersRepository'

import { FindUsersController } from './FindUsersController'
import { FindUsersUseCase } from './FindUsersUseCase'

const prismaUsersRepository = new PrismaUsersRepository()

const findUsersUseCase = new FindUsersUseCase(prismaUsersRepository)

const findUsersController = new FindUsersController(findUsersUseCase)

export { findUsersUseCase, findUsersController }
