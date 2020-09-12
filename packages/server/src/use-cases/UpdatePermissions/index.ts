import { PrismaPermissionsRepository } from 'repositories/implementations/PrismaPermissionsRepository'

import { UpdatePermissionsController } from './UpdatePermissionsController'
import { updatePermissionsSchema } from './UpdatePermissionsSchema'
import { UpdatePermissionsUseCase } from './UpdatePermissionsUseCase'

const prismaPermissionsRepository = new PrismaPermissionsRepository()

const updatePermissionsUseCase = new UpdatePermissionsUseCase(
  prismaPermissionsRepository
)

const updatePermissionsController = new UpdatePermissionsController(
  updatePermissionsUseCase
)

export { updatePermissionsController, updatePermissionsSchema }
