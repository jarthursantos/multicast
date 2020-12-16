import { createWinThorClientsModel } from '~/models/clients/WinThorClientsModel'

import { createFindAllClientsModule } from './find-all'
import { createFindClientByIdModule } from './find-by-id'

const clientsModel = createWinThorClientsModel()

const findAllClientsModule = createFindAllClientsModule(clientsModel)
const findClientByIdModule = createFindClientByIdModule(clientsModel)

export { findAllClientsModule, findClientByIdModule }
