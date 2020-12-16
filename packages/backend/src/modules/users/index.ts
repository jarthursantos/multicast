import { createMongoUserChangesModel } from '~/models/users/changes/MongoUserChangesModel'
import { createPrismaUsersModel } from '~/models/users/PrismaUsersModel'

import { createCreateUserModule } from './create'
import { createUserSchema } from './create/schema'
import { createDisableUserModule } from './disable'
import { createEnableUserModule } from './enable'
import { createFindAllUsersModule } from './find-all'
import { createFindUserByIdModule } from './find-by-id'
import { createUpdateUserModule } from './update'
import { updateUserSchema } from './update/schema'

const usersModel = createPrismaUsersModel()
const userChangessModel = createMongoUserChangesModel(usersModel)

const createUserModule = createCreateUserModule(usersModel, userChangessModel)
const disableUserModule = createDisableUserModule(usersModel, userChangessModel)
const enableUserModule = createEnableUserModule(usersModel, userChangessModel)
const findAllUsersModule = createFindAllUsersModule(usersModel)
const findUserByIdModule = createFindUserByIdModule(usersModel)
const updateUserModule = createUpdateUserModule(usersModel, userChangessModel)

export {
  createUserModule,
  createUserSchema,
  disableUserModule,
  enableUserModule,
  findAllUsersModule,
  findUserByIdModule,
  updateUserModule,
  updateUserSchema
}
