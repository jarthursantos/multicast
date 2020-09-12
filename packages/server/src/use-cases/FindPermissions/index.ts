import { PrismaPermissionsRepository } from 'repositories/implementations/PrismaPermissionsRepository'

import { FindPermissionsController } from './FindPermissionsController'
import { FindPermissionsUseCase } from './FindPermissionsUseCase'

const prismaPermissionsRepository = new PrismaPermissionsRepository()

const findPermissionsUseCase = new FindPermissionsUseCase(
  prismaPermissionsRepository
)

const findPermissionsController = new FindPermissionsController(
  findPermissionsUseCase
)

export { findPermissionsUseCase, findPermissionsController }
