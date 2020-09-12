import { PrismaPermissionsRepository } from 'repositories/implementations/PrismaPermissionsRepository'

import { FindPermissionsByIdUseCase } from './FindPermissionsByIdUseCase'
import { FindPermissionsByIdController } from './FindPermissionsByIdController'

const prismaPermissionsRepository = new PrismaPermissionsRepository()

const findPermissionsByIdUseCase = new FindPermissionsByIdUseCase(
  prismaPermissionsRepository
)

const findPermissionsByIdController = new FindPermissionsByIdController(
  findPermissionsByIdUseCase
)

export { findPermissionsByIdUseCase, findPermissionsByIdController }
