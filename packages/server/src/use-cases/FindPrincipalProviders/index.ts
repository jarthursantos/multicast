import { WinThorPrincipalProviderRepository } from 'repositories/implementations/WinThorPrincipalProviderRepository'

import { FindPrincipalProvidersController } from './FindPrincipalProvidersController'
import { FindPrincipalProvidersUseCase } from './FindPrincipalProvidersUseCase'

const winThorPrincipalProviderRepository = new WinThorPrincipalProviderRepository()

const findPrincipalProvidersUseCase = new FindPrincipalProvidersUseCase(
  winThorPrincipalProviderRepository
)

const findPrincipalProvidersController = new FindPrincipalProvidersController(
  findPrincipalProvidersUseCase
)

export { findPrincipalProvidersController, findPrincipalProvidersUseCase }
