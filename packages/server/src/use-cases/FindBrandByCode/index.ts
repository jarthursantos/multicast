import { WinThorBrandRepository } from 'repositories/implementations/WinThorBrandRepository'

import { FindBrandByCodeController } from './FindBrandByCodeController'
import { FindBrandByCodeUseCase } from './FindBrandByCodeUseCase'

const winThorBrandRepository = new WinThorBrandRepository()

const findBrandByCodeUseCase = new FindBrandByCodeUseCase(
  winThorBrandRepository
)

const findBrandByCodeController = new FindBrandByCodeController(
  findBrandByCodeUseCase
)

export { findBrandByCodeController, findBrandByCodeUseCase }
