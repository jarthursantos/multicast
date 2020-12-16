import { createWinThorBuyersModel } from '~/models/buyers/WinThorBuyersModel'

import { createFindAllBuyersModule } from './find-all'
import { createFindBuyerByIdModule } from './find-by-id'

const buyersModel = createWinThorBuyersModel()

const findAllBuyersModule = createFindAllBuyersModule(buyersModel)
const findBuyerByIdModule = createFindBuyerByIdModule(buyersModel)

export { findAllBuyersModule, findBuyerByIdModule }
