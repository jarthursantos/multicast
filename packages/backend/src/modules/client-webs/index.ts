import { createWinThorClientWebsModel } from '~/models/client-webs/WinThorClientWebsModel'

import { createFindAllClientWebsModule } from './find-all'
import { createFindClientWebByIdModule } from './find-by-id'

const clientWebsModel = createWinThorClientWebsModel()

const findAllClientWebsModule = createFindAllClientWebsModule(clientWebsModel)
const findClientWebByIdModule = createFindClientWebByIdModule(clientWebsModel)

export { findAllClientWebsModule, findClientWebByIdModule }
