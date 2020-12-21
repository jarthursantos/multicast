import { WinThorSalesByProviderRepository } from 'repositories/implementations/WinThorSalesByProviderRepository'

import { FindSalesByProviderPerClientLitigationController } from './FindSalesByProviderPerClientLitigationController'
import { FindSalesByProviderPerClientLitigationUseCase } from './FindSalesByProviderPerClientLitigationUseCase'

const winThorSalesByProviderRepository = new WinThorSalesByProviderRepository()

const findSalesByProviderPerClientLitigationUseCase = new FindSalesByProviderPerClientLitigationUseCase(
  winThorSalesByProviderRepository
)

const findSalesByProviderPerClientLitigationController = new FindSalesByProviderPerClientLitigationController(
  findSalesByProviderPerClientLitigationUseCase
)

export {
  findSalesByProviderPerClientLitigationController,
  findSalesByProviderPerClientLitigationUseCase
}
