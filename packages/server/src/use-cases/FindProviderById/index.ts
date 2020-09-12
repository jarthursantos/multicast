import { WinThorProviderRepository } from 'repositories/implementations/WinThorProviderRepository'

import { FindProviderByIdController } from './FindProviderByIdController'
import { FindProviderByIdUseCase } from './FindProviderByIdUseCase'

const winThorProviderRepository = new WinThorProviderRepository()

const findProviderByIdUseCase = new FindProviderByIdUseCase(
  winThorProviderRepository
)

const findProviderByIdController = new FindProviderByIdController(
  findProviderByIdUseCase
)

export { findProviderByIdUseCase, findProviderByIdController }
