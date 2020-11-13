import { WinThorSalesByProviderRepository } from 'repositories/implementations/WinThorSalesByProviderRepository'

import { FindSalesByProviderPerClientSalesValueController } from './FindSalesByProviderPerClientSalesValueController'
import { FindSalesByProviderPerClientSalesValueUseCase } from './FindSalesByProviderPerClientSalesValueUseCase'

const winThorSalesByProviderRepository = new WinThorSalesByProviderRepository()

const findSalesByProviderPerClientSalesValueUseCase = new FindSalesByProviderPerClientSalesValueUseCase(
  winThorSalesByProviderRepository
)

const findSalesByProviderPerClientSalesValueController = new FindSalesByProviderPerClientSalesValueController(
  findSalesByProviderPerClientSalesValueUseCase
)

export {
  findSalesByProviderPerClientSalesValueController,
  findSalesByProviderPerClientSalesValueUseCase
}
