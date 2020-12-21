import { createWinThorRegionsModel } from '~/models/regions/WinThorRegionsModel'

import { createFindAllRegionsModule } from './find-all'
import { createFindRegionByIdModule } from './find-by-id'

const regionsModel = createWinThorRegionsModel()

const findAllRegionsModule = createFindAllRegionsModule(regionsModel)
const findRegionByIdModule = createFindRegionByIdModule(regionsModel)

export { findAllRegionsModule, findRegionByIdModule }
