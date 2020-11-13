import { WinThorRegionRepository } from 'repositories/implementations/WinThorRegionRepository'

import { FindRegionByCodeController } from './FindRegionByCodeController'
import { FindRegionByCodeUseCase } from './FindRegionByCodeUseCase'

const winThorRegionRepository = new WinThorRegionRepository()

const findRegionByCodeUseCase = new FindRegionByCodeUseCase(
  winThorRegionRepository
)

const findRegionByCodeController = new FindRegionByCodeController(
  findRegionByCodeUseCase
)

export { findRegionByCodeUseCase, findRegionByCodeController }
