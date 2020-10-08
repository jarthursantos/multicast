import { WinThorRepresentativeRepository } from 'repositories/implementations/WinThorRepresentativeRepository'

import { FindRepresentativesController } from './FindRepresentativesController'
import { FindRepresentativesUseCase } from './FindRepresentativesUseCase'

const winThorRepresentativeRepository = new WinThorRepresentativeRepository()

const findRepresentativesUseCase = new FindRepresentativesUseCase(
  winThorRepresentativeRepository
)

const findRepresentativesController = new FindRepresentativesController(
  findRepresentativesUseCase
)

export { findRepresentativesController, findRepresentativesUseCase }
