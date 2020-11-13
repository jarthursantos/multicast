import { WinThorRevenuesRepository } from 'repositories/implementations/WinThorRevenuesRepository'

import { FindRevenuesPerRegionController } from './FindRevenuesPerRegionController'
import { FindRevenuesPerRegionUseCase } from './FindRevenuesPerRegionUseCase'

const winThorRevenuesRepository = new WinThorRevenuesRepository()

const findRevenuesPerRegionUseCase = new FindRevenuesPerRegionUseCase(
  winThorRevenuesRepository
)

const findRevenuesPerRegionController = new FindRevenuesPerRegionController(
  findRevenuesPerRegionUseCase
)

export { findRevenuesPerRegionController, findRevenuesPerRegionUseCase }
