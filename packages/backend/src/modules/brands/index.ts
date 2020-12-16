import { createWinThorBrandsModel } from '~/models/brands/WinThorBrandsModel'

import { createFindAllBrandsModule } from './find-all'
import { createFindBrandByIdModule } from './find-by-id'

const brandsModel = createWinThorBrandsModel()

const findAllBrandsModule = createFindAllBrandsModule(brandsModel)
const findBrandByIdModule = createFindBrandByIdModule(brandsModel)

export { findAllBrandsModule, findBrandByIdModule }
