import { WinThorSalesByProviderRepository } from 'repositories/implementations/WinThorSalesByProviderRepository'

import { FindSalesByProviderPerClientController } from './FindSalesByProviderPerClientController'
import { FindSalesByProviderPerClientUseCase } from './FindSalesByProviderPerClientUseCase'

const winThorSalesByProviderRepository = new WinThorSalesByProviderRepository()

const findSalesByProviderPerClientUseCase = new FindSalesByProviderPerClientUseCase(
  winThorSalesByProviderRepository
)

const findSalesByProviderPerClientController = new FindSalesByProviderPerClientController(
  findSalesByProviderPerClientUseCase
)

export {
  findSalesByProviderPerClientController,
  findSalesByProviderPerClientUseCase
}
