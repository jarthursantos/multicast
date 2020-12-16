import { createWinThorSalesClassesModel } from '~/models/sales-classes/WinThorSalesClassesModel'

import { createFindAllSalesClassesModule } from './find-all'

const salesClassesModel = createWinThorSalesClassesModel()

const findAllSalesClassesModule = createFindAllSalesClassesModule(
  salesClassesModel
)

export { findAllSalesClassesModule }
