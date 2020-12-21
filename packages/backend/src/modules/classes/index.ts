import { createWinThorClassesModel } from '~/models/classes/WinThorClassesModel'

import { createFindAllClassesModule } from './find-all'

const classesModel = createWinThorClassesModel()

const findAllClassesModule = createFindAllClassesModule(classesModel)

export { findAllClassesModule }
