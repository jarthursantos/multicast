import { createWinThorCategoriesModel } from '~/models/categories/WinThorCategoriesModel'
import { createWinThorSectionsModel } from '~/models/sections/WinThorSectionsModel'
import { createWinThorSubcategoriesModel } from '~/models/subcategories/WinThorSubcategoriesModel'

import { createFindAllSubcategoriesModule } from './find-all'
import { createFindSubcategoryByIdModule } from './find-by-id'

const sectionsModel = createWinThorSectionsModel()
const categoriesModel = createWinThorCategoriesModel()
const subcategoriesModel = createWinThorSubcategoriesModel()

const findAllSubcategoriesModule = createFindAllSubcategoriesModule(
  sectionsModel,
  categoriesModel,
  subcategoriesModel
)
const findSubcategoryByIdModule = createFindSubcategoryByIdModule(
  sectionsModel,
  categoriesModel,
  subcategoriesModel
)

export { findAllSubcategoriesModule, findSubcategoryByIdModule }
