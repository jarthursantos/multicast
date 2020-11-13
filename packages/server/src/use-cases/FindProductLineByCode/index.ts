import { WinThorProductLineRepository } from 'repositories/implementations/WinThorProductLineRepository'

import { FindProductLineByCodeController } from './FindProductLineByCodeController'
import { FindProductLineByCodeUseCase } from './FindProductLineByCodeUseCase'

const winThorProductLineRepository = new WinThorProductLineRepository()

const findProductLineByCodeUseCase = new FindProductLineByCodeUseCase(
  winThorProductLineRepository
)

const findProductLineByCodeController = new FindProductLineByCodeController(
  findProductLineByCodeUseCase
)

export { findProductLineByCodeUseCase, findProductLineByCodeController }
