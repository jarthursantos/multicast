import { WinThorProductRepository } from 'repositories/implementations/WinThorProductRepository'

import { FindProductsController } from './FindProductsController'
import { FindProductsUseCase } from './FindProductsUseCase'

const winThorProductRepository = new WinThorProductRepository()

const findProductsUseCase = new FindProductsUseCase(winThorProductRepository)

const findProductsController = new FindProductsController(findProductsUseCase)

export { findProductsController, findProductsUseCase }
