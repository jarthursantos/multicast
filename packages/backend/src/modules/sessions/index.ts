import { createPrismaUsersModel } from '~/models/users/PrismaUsersModel'

import { createCreateSessionModule } from './create'
import { createSessionSchema } from './create/schema'

const usersModel = createPrismaUsersModel()

const createSessionModule = createCreateSessionModule(usersModel)

export { createSessionModule, createSessionSchema }
