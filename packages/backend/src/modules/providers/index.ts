import { createWinThorProvidersModel } from '~/models/providers/WinThorProvidersModel'

import { createSearchProviderModel } from './search'

const providersModel = createWinThorProvidersModel()

const searchProvidersModel = createSearchProviderModel(providersModel)

export { searchProvidersModel }
export * from './search/parser'
