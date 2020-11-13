import { WinThorRevenuesRepository } from 'repositories/implementations/WinThorRevenuesRepository'

import { FindRevenuesPerClassController } from './FindRevenuesPerClassController'
import { FindRevenuesPerClassUseCase } from './FindRevenuesPerClassUseCase'

const winThorRevenuesRepository = new WinThorRevenuesRepository()

const findRevenuesPerClassUseCase = new FindRevenuesPerClassUseCase(
  winThorRevenuesRepository
)

const findRevenuesPerClassController = new FindRevenuesPerClassController(
  findRevenuesPerClassUseCase
)

export { findRevenuesPerClassController, findRevenuesPerClassUseCase }
