import { WinThorSalesByProviderRepository } from 'repositories/implementations/WinThorSalesByProviderRepository'

import { FindSalesByProviderPerSquareController } from './FindSalesByProviderPerSquareController'
import { FindSalesByProviderPerSquareUseCase } from './FindSalesByProviderPerSquareUseCase'

const winThorSalesByProviderRepository = new WinThorSalesByProviderRepository()

const findSalesByProviderPerSquareUseCase = new FindSalesByProviderPerSquareUseCase(
  winThorSalesByProviderRepository
)

const findSalesByProviderPerSquareController = new FindSalesByProviderPerSquareController(
  findSalesByProviderPerSquareUseCase
)

export {
  findSalesByProviderPerSquareController,
  findSalesByProviderPerSquareUseCase
}
