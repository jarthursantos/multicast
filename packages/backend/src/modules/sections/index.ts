import { createWinThorSectionsModel } from '~/models/sections/WinThorSectionsModel'

import { createFindAllSectionsModule } from './find-all'
import { createFindSectionByIdModule } from './find-by-id'

const sectionsModel = createWinThorSectionsModel()

const findAllSectionsModule = createFindAllSectionsModule(sectionsModel)
const findSectionByIdModule = createFindSectionByIdModule(sectionsModel)

export { findAllSectionsModule, findSectionByIdModule }
