import { WinThorRevenuesRepository } from 'repositories/implementations/WinThorRevenuesRepository'

import { FindRevenuesPerActuationAreaController } from './FindRevenuesPerActuationAreaController'
import { FindRevenuesPerActuationAreaUseCase } from './FindRevenuesPerActuationAreaUseCase'

const winThorRevenuesRepository = new WinThorRevenuesRepository()

const findRevenuesPerActuationAreaUseCase = new FindRevenuesPerActuationAreaUseCase(
  winThorRevenuesRepository
)

const findRevenuesPerActuationAreaController = new FindRevenuesPerActuationAreaController(
  findRevenuesPerActuationAreaUseCase
)

export {
  findRevenuesPerActuationAreaController,
  findRevenuesPerActuationAreaUseCase
}
