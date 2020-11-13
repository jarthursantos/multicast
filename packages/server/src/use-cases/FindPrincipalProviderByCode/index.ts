import { WinThorPrincipalProviderRepository } from 'repositories/implementations/WinThorPrincipalProviderRepository'

import { FindPrincipalProviderByCodeController } from './FindPrincipalProviderByCodeController'
import { FindPrincipalProviderByCodeUseCase } from './FindPrincipalProviderByCodeUseCase'

const winThorPrincipalProviderRepository = new WinThorPrincipalProviderRepository()

const findPrincipalProviderByCodeUseCase = new FindPrincipalProviderByCodeUseCase(
  winThorPrincipalProviderRepository
)

const findPrincipalProviderByCodeController = new FindPrincipalProviderByCodeController(
  findPrincipalProviderByCodeUseCase
)

export {
  findPrincipalProviderByCodeController,
  findPrincipalProviderByCodeUseCase
}
