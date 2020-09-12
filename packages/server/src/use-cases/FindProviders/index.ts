import { WinThorProviderRepository } from 'repositories/implementations/WinThorProviderRepository'

import { FindProvidersController } from './FindProvidersController'
import { FindProvidersUseCase } from './FindProvidersUseCase'

const winThorProviderRepository = new WinThorProviderRepository()

const findProvidersUseCase = new FindProvidersUseCase(winThorProviderRepository)

const findProvidersController = new FindProvidersController(
  findProvidersUseCase
)

export { findProvidersUseCase, findProvidersController }
