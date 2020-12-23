import { createWinThorProvidersModel } from '~/models/providers/WinThorProvidersModel'

import { createFindProviderByCodeModule } from './find-by-code'
import { createSearchProviderModule } from './search'

const providersModel = createWinThorProvidersModel()

const searchProvidersModule = createSearchProviderModule(providersModel)
const findProviderByCodeModule = createFindProviderByCodeModule(providersModel)

export { searchProvidersModule, findProviderByCodeModule }
export * from './search/parser'
