import { WinThorProductLineRepository } from 'repositories/implementations/WinThorProductLineRepository'

import { FindProductLinesController } from './FindProductLinesController'
import { FindProductLinesUseCase } from './FindProductLinesUseCase'

const winThorProductLineRepository = new WinThorProductLineRepository()

const findProductLinesUseCase = new FindProductLinesUseCase(
  winThorProductLineRepository
)

const findProductLinesController = new FindProductLinesController(
  findProductLinesUseCase
)

export { findProductLinesUseCase, findProductLinesController }
