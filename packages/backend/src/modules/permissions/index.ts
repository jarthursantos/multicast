import { createPrismaPermissionsModel } from '~/models/permissions/PrismaPermissionsModel'

import { createCreatePermissionsModule } from './create'
import { createPermissionsSchema } from './create/schema'
import { createFindAllPermissionsModule } from './find-all'
import { createFindPermissionsByIdModule } from './find-by-id'
import { createUpdatePermissionsModule } from './update'
import { updatePermissionsSchema } from './update/schema'

const permissionsModel = createPrismaPermissionsModel()

const createPermissionsModule = createCreatePermissionsModule(permissionsModel)
const findPermissionsByIdModule = createFindPermissionsByIdModule(
  permissionsModel
)
const findAllPermissionsModule = createFindAllPermissionsModule(
  permissionsModel
)
const updatePermissionsModule = createUpdatePermissionsModule(permissionsModel)

export {
  createPermissionsModule,
  createPermissionsSchema,
  findPermissionsByIdModule,
  findAllPermissionsModule,
  updatePermissionsModule,
  updatePermissionsSchema
}
