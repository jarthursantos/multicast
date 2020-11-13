import { WinThorPrincipalClientRepository } from 'repositories/implementations/WinThorPrincipalClientRepository'

import { FindPrincipalClientByCodeController } from './FindPrincipalClientByCodeController'
import { FindPrincipalClientByCodeUseCase } from './FindPrincipalClientByCodeUseCase'

const winThorPrincipalClientRepository = new WinThorPrincipalClientRepository()

const findPrincipalClientByCodeUseCase = new FindPrincipalClientByCodeUseCase(
  winThorPrincipalClientRepository
)

const findPrincipalClientByCodeController = new FindPrincipalClientByCodeController(
  findPrincipalClientByCodeUseCase
)

export { findPrincipalClientByCodeUseCase, findPrincipalClientByCodeController }
