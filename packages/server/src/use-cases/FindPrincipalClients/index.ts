import { WinThorPrincipalClientRepository } from 'repositories/implementations/WinThorPrincipalClientRepository'

import { FindPrincipalClientsController } from './FindPrincipalClientsController'
import { FindPrincipalClientsUseCase } from './FindPrincipalClientsUseCase'

const winThorPrincipalClientRepository = new WinThorPrincipalClientRepository()

const findPrincipalClientsUseCase = new FindPrincipalClientsUseCase(
  winThorPrincipalClientRepository
)

const findPrincipalClientsController = new FindPrincipalClientsController(
  findPrincipalClientsUseCase
)

export { findPrincipalClientsUseCase, findPrincipalClientsController }
