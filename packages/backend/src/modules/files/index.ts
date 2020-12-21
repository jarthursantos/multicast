import { createPrismaFilesModel } from '~/models/files/PrismaFilesModel'

import { createCreateFilesModule } from './create'

const filesModel = createPrismaFilesModel()

const createFilesModule = createCreateFilesModule(filesModel)

export { createFilesModule }
