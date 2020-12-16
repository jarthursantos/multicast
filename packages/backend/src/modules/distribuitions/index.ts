import { createWinThorDistribuitionsModel } from '~/models/distribuitions/WinThorDistribuitionsModel'

import { createFindAllDistribuitionsModule } from './find-all'
import { createFindDistribuitionsByIdModule } from './find-by-id'

const distribuitionsModel = createWinThorDistribuitionsModel()

const findAllDistribuitionsModule = createFindAllDistribuitionsModule(
  distribuitionsModel
)
const findDistribuitionsByIdModule = createFindDistribuitionsByIdModule(
  distribuitionsModel
)

export { findAllDistribuitionsModule, findDistribuitionsByIdModule }
