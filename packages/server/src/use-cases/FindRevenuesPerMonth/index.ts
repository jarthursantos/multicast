import { WinThorRevenuesRepository } from 'repositories/implementations/WinThorRevenuesRepository'

import { FindRevenuesPerMonthController } from './FindRevenuesPerMonthController'
import { FindRevenuesPerMonthUseCase } from './FindRevenuesPerMonthUseCase'

const winThorRevenuesRepository = new WinThorRevenuesRepository()

const findRevenuesPerMonthUseCase = new FindRevenuesPerMonthUseCase(
  winThorRevenuesRepository
)

const findRevenuesPerMonthController = new FindRevenuesPerMonthController(
  findRevenuesPerMonthUseCase
)

export { findRevenuesPerMonthController, findRevenuesPerMonthUseCase }
