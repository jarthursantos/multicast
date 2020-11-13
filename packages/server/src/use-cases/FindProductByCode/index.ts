import { WinThorProductRepository } from 'repositories/implementations/WinThorProductRepository'

import { FindProductByCodeController } from './FindProductByCodeController'
import { FindProductByCodeUseCase } from './FindProductByCodeUseCase'

const winThorProductRepository = new WinThorProductRepository()

const findProductByCodeUseCase = new FindProductByCodeUseCase(
  winThorProductRepository
)

const findProductByCodeController = new FindProductByCodeController(
  findProductByCodeUseCase
)

export { findProductByCodeController, findProductByCodeUseCase }
