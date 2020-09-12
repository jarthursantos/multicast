import { PrismaPermissionsRepository } from 'repositories/implementations/PrismaPermissionsRepository'

import { CreatePermissionsController } from './CreatePermissionsController'
import { createPermissionsSchema } from './CreatePermissionsSchema'
import { CreatePermissionsUseCase } from './CreatePermissionsUseCase'

const prismaPermissionsRepository = new PrismaPermissionsRepository()

const createPermissionsUseCase = new CreatePermissionsUseCase(
  prismaPermissionsRepository
)

const createPermissionsController = new CreatePermissionsController(
  createPermissionsUseCase
)

export {
  createPermissionsUseCase,
  createPermissionsController,
  createPermissionsSchema
}
