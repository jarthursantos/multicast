import { createWinThorCategoriesModel } from '~/models/categories/WinThorCategoriesModel'
import { createWinThorSectionsModel } from '~/models/sections/WinThorSectionsModel'

import { createFindAllCategoriesModule } from './find-all'
import { createFindSectionByIdModule } from './find-by-id'

const sectionsModel = createWinThorSectionsModel()

const categoriesModel = createWinThorCategoriesModel()

const findAllCategoriesModule = createFindAllCategoriesModule(
  sectionsModel,
  categoriesModel
)
const findSectionByIdModule = createFindSectionByIdModule(
  sectionsModel,
  categoriesModel
)

export { findAllCategoriesModule, findSectionByIdModule }
