import { WinThorSalesByProviderRepository } from 'repositories/implementations/WinThorSalesByProviderRepository'

import { FindSalesByProviderPerProductProviderController } from './FindSalesByProviderPerProductProviderController'
import { FindSalesByProviderPerProductProviderUseCase } from './FindSalesByProviderPerProductProviderUseCase'

const winThorSalesByProviderRepository = new WinThorSalesByProviderRepository()

const findSalesByProviderPerProductProviderUseCase = new FindSalesByProviderPerProductProviderUseCase(
  winThorSalesByProviderRepository
)

const findSalesByProviderPerProductProviderController = new FindSalesByProviderPerProductProviderController(
  findSalesByProviderPerProductProviderUseCase
)

export {
  findSalesByProviderPerProductProviderController,
  findSalesByProviderPerProductProviderUseCase
}
