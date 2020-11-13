import { WinThorBuyerRepository } from 'repositories/implementations/WinThorBuyerRepository'

import { FindBuyersController } from './FindBuyersController'
import { FindBuyersUseCase } from './FindBuyersUseCase'

const winThorBuyerRepository = new WinThorBuyerRepository()

const findBuyersUseCase = new FindBuyersUseCase(winThorBuyerRepository)

const findBuyersController = new FindBuyersController(findBuyersUseCase)

export { findBuyersUseCase, findBuyersController }
